"use server";

import { redirect } from "next/navigation";
import { contactSchema } from "@/schemas/contact.schema";
import { getAuth } from "@/server/data/auth.data";
import Contact from "@/server/models/contact";
import { ActionError, handleError } from "@/server/utils/error.util";

export async function addContact(payload: any) {
  const auth = await getAuth();

  if (!auth) {
    redirect("/sign-in");
  }

  try {
    const contactDto = contactSchema.parse(payload);

    await Contact.query().insertGraph({
      user_id: auth.user.id,
      full_name: contactDto.fullName,
      nick_name: contactDto.nickName,
      phone_number: contactDto.phoneNumber,
      email: contactDto.email,
      addresses: contactDto.addresses.map((address) => ({
        street: address.street,
        city: address.city,
        district: address.district,
        sub_district: address.subDistrict,
        postal_code: address.postalCode,
      })),
    });
  } catch (error) {
    return handleError("addContact", error);
  }
}

export async function updateContact(payload: any, contactId?: number) {
  const auth = await getAuth();

  if (!auth) {
    redirect("/sign-in");
  }

  try {
    const contactDto = contactSchema.parse(payload);

    if (!contactId) {
      throw new ActionError("Contact id is required");
    }

    const contact = await Contact.query()
      .where("user_id", auth.user.id)
      .andWhere("id", contactId)
      .first();

    if (!contact) {
      throw new ActionError("Contact not found");
    }

    await Contact.query().upsertGraph({
      id: contact.id,
      user_id: auth.user.id,
      full_name: contactDto.fullName,
      nick_name: contactDto.nickName,
      phone_number: contactDto.phoneNumber,
      email: contactDto.email,
      addresses: contactDto.addresses.map((address) => ({
        street: address.street,
        city: address.city,
        district: address.district,
        sub_district: address.subDistrict,
        postal_code: address.postalCode,
      })),
    });
  } catch (error) {
    return handleError("updateContact", error);
  }
}

export async function deleteContact(contactId: number) {
  const auth = await getAuth();

  if (!auth) {
    redirect("/sign-in");
  }

  try {
    const contact = await Contact.query()
      .where("user_id", auth.user.id)
      .andWhere("id", contactId)
      .first();

    if (!contact) {
      throw new ActionError("Contact not found");
    }

    await Contact.transaction(async (trx) => {
      await Contact.relatedQuery("addresses", trx).for(contact.id).delete();
      await Contact.relatedQuery("groups", trx).for(contact.id).unrelate();
      await Contact.query(trx).where("id", contact.id).delete();
    });
  } catch (error) {
    return handleError("deleteContact", error);
  }
}
