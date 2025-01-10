import { faker } from "@faker-js/faker";
import knex from "../db/knex";
import moment from "moment";
import bcrypt from "bcrypt";

export async function createUser(userData) {
  const user = await knex("users")
    .where("email", userData.email)
    .orWhere("phone_number", userData.phoneNumber)
    .first();
  if (user) {
    return;
  }
  await knex("users").insert({
    name: userData.name,
    email: userData.email,
    phone_number: userData.phoneNumber,
    bio: userData.bio,
    password: bcrypt.hashSync(userData.password, 10),
    created_at: moment().unix(),
    updated_at: moment().unix(),
  });
}

export async function createSession(emailOrPhoneNumber) {
  const user = await knex("users")
    .where("email", emailOrPhoneNumber)
    .orWhere("phone_number", emailOrPhoneNumber)
    .first();
  if (!user) {
    return;
  }
  const [session] = await knex("sessions")
    .insert({
      user_id: user.id,
      expires_at: moment().add(1, "day").unix(),
      created_at: moment().unix(),
      updated_at: moment().unix(),
    })
    .returning("*");

  return session.id;
}

export async function getUser(emailOrPhoneNumber) {
  const user = await knex("users")
    .where("email", emailOrPhoneNumber)
    .orWhere("phone_number", emailOrPhoneNumber)
    .first();

  return user;
}

export async function deleteUser(emailOrPhoneNumber) {
  const user = await knex("users")
    .where("email", emailOrPhoneNumber)
    .orWhere("phone_number", emailOrPhoneNumber)
    .first();
  if (!user) {
    return;
  }

  await knex.transaction(async (trx) => {
    const contacts = await trx("contacts")
      .where("user_id", user.id)
      .forUpdate();
    const contactIds = contacts.map((contact) => contact.id);
    const groups = await trx("groups").where("user_id", user.id).forUpdate();
    const groupIds = groups.map((group) => group.id);

    await trx("addresses").whereIn("contact_id", contactIds).delete();
    await trx("group_members")
      .whereIn("contact_id", contactIds)
      .orWhereIn("group_id", groupIds)
      .delete();
    await trx("contacts").whereIn("id", contactIds).delete();
    await trx("groups").whereIn("id", groupIds).delete();
    await trx("sessions").where("user_id", user.id).delete();
    await trx("users").where("id", user.id).delete();
  });
}

export async function createContacts(userId, number = 3) {
  const user = await knex("users").where("id", userId).first();
  if (!user) {
    throw new Error("User not found");
  }

  await knex.transaction(async (trx) => {
    const insertedContacts = await trx("contacts")
      .insert(
        Array.from({ length: number }, () => ({
          user_id: userId,
          full_name: faker.person.fullName(),
          nick_name: faker.person.firstName(),
          phone_number: faker.phone.number(),
          email: faker.internet.email(),
          created_at: moment().unix(),
          updated_at: moment().unix(),
        }))
      )
      .returning("*");

    for (const insertedContact of insertedContacts) {
      const contactId = insertedContact.id;

      const addresses = Array.from({ length: contactId % 3 }, () => ({
        contact_id: contactId,
        street: faker.location.street(),
        city: faker.location.city(),
        district: faker.location.state(),
        sub_district: faker.location.state(),
        postal_code: faker.location.zipCode(),
        created_at: moment().unix(),
        updated_at: moment().unix(),
      }));

      if (addresses.length > 0) {
        await trx("addresses").insert(addresses);
      }
    }
  });
}

export async function createContact(userId, withAddress = true) {
  const user = await knex("users").where("id", userId).first();
  if (!user) {
    throw new Error("User not found");
  }

  await knex.transaction(async (trx) => {
    const [insertedContact] = await trx("contacts")
      .insert({
        user_id: userId,
        full_name: faker.person.fullName(),
        nick_name: faker.person.firstName(),
        phone_number: faker.phone.number(),
        email: faker.internet.email(),
        created_at: moment().unix(),
        updated_at: moment().unix(),
      })
      .returning("*");

    if (withAddress) {
      const contactId = insertedContact.id;

      const addresses = Array.from({ length: 2 }, () => ({
        contact_id: contactId,
        street: faker.location.street(),
        city: faker.location.city(),
        district: faker.location.state(),
        sub_district: faker.location.state(),
        postal_code: faker.location.zipCode(),
        created_at: moment().unix(),
        updated_at: moment().unix(),
      }));

      await trx("addresses").insert(addresses);
    }
  });
}

export async function getContacts(userId) {
  const contacts = await knex("contacts").where("user_id", userId);
  const addresses = await knex("addresses").whereIn(
    "contact_id",
    contacts.map((contact) => contact.id)
  );

  return contacts.map((contact) => ({
    ...contact,
    addresses: addresses.filter((address) => address.contact_id === contact.id),
  }));
}

export async function getContactById(contactId) {
  const [contact] = await knex("contacts")
    .select(
      "id",
      "full_name as fullName",
      "nick_name as nickName",
      "phone_number as phoneNumber",
      "email"
    )
    .where("id", contactId);

  if (!contact) {
    return null;
  }

  const addresses = await knex("addresses")
    .select(
      "street",
      "city",
      "district",
      "sub_district as subDistrict",
      "postal_code as postalCode"
    )
    .where("contact_id", contact.id);

  return {
    ...contact,
    addresses: addresses,
  };
}

export async function createGroups(userId, number = 3) {
  const user = await knex("users").where("id", userId).first();
  if (!user) {
    throw new Error("User not found");
  }

  await knex("groups").insert(
    Array.from({ length: number }, () => ({
      user_id: userId,
      name: faker.word.noun(),
      description: faker.lorem.sentence(),
      created_at: moment().unix(),
      updated_at: moment().unix(),
    }))
  );
}

export async function createGroupMembers(groupId, contactIds) {
  await knex("group_members").insert(
    contactIds.map((contactId) => ({
      group_id: groupId,
      contact_id: contactId,
    }))
  );
}

export async function getGroups(userId) {
  const groups = await knex("groups").where("user_id", userId);
  const groupMembers = await knex("group_members").whereIn(
    "group_id",
    groups.map((group) => group.id)
  );
  const contacts = await knex("contacts").whereIn(
    "id",
    groupMembers.map((groupMember) => groupMember.contact_id)
  );
  const addresses = await knex("addresses").whereIn(
    "contact_id",
    contacts.map((contact) => contact.id)
  );

  const contactsWithAddresses = contacts.map((contact) => ({
    ...contact,
    addresses: addresses.filter((address) => address.contact_id === contact.id),
  }));

  return groups.map((group) => ({
    ...group,
    members: contactsWithAddresses.filter((contact) =>
      groupMembers.some(
        (groupMember) =>
          groupMember.group_id === group.id &&
          groupMember.contact_id === contact.id
      )
    ),
  }));
}

export async function getGroupById(groupId) {
  const [group] = await knex("groups")
    .select("id", "name", "description")
    .where("id", groupId);

  if (!group) {
    return null;
  }

  return group;
}
