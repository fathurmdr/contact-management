import request from "supertest";
import config from "../config";
import {
  createContact,
  createContacts,
  createGroupMembers,
  createGroups,
  createSession,
  createUser,
  deleteUser,
  getContactById,
  getContacts,
  getGroups,
  getUser,
} from "../util/test-util";
import { user as userData } from "../data/data";
import { faker } from "@faker-js/faker";

let sessionId;
let user;

describe("GET /contact", () => {
  beforeEach(async () => {
    await createUser(userData);
    user = await getUser(userData.email);
    sessionId = await createSession(user.email);
  });

  afterEach(async () => {
    await deleteUser(userData.email);
  });

  it("should cannot access api without session", async () => {
    const res = await request(config.baseURL).get("/contact");

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe("Not Authorized!");
  });

  it("should get all contacts successfully", async () => {
    await createContacts(user.id, 5);

    const res = await request(config.baseURL)
      .get("/contact")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Contacts fetched successfully");
    expect(res.body.data.length).toBe(5);
    expect(typeof res.body.data[0].fullName).toBe("string");
    expect(typeof res.body.data[0].phoneNumber).toBe("string");
    expect(res.body.data[0].createdAt).toBeUndefined();
    expect(res.body.data[0].updatedAt).toBeUndefined();

    if (res.body.data[0].nickName) {
      expect(typeof res.body.data[0].nickName).toBe("string");
    }

    if (res.body.data[0].email) {
      expect(typeof res.body.data[0].email).toBe("string");
    }

    const contactWithEmptyAddresses = res.body.data.find(
      (contact) => contact.addresses.length === 0
    );

    expect(contactWithEmptyAddresses.addresses).toBeDefined();
    expect(contactWithEmptyAddresses.addresses.length).toBe(0);

    const contactWithAddresses = res.body.data.find(
      (contact) => contact.addresses.length > 0
    );

    expect(typeof contactWithAddresses.addresses[0].street).toBe("string");
    expect(contactWithAddresses.addresses[0].createdAt).toBeUndefined();
    expect(contactWithAddresses.addresses[0].updatedAt).toBeUndefined();

    if (contactWithAddresses.addresses[0].city) {
      expect(typeof contactWithAddresses.addresses[0].city).toBe("string");
    }
    if (contactWithAddresses.addresses[0].district) {
      expect(typeof contactWithAddresses.addresses[0].district).toBe("string");
    }
    if (contactWithAddresses.addresses[0].subDistrict) {
      expect(typeof contactWithAddresses.addresses[0].subDistrict).toBe(
        "string"
      );
    }
    if (contactWithAddresses.addresses[0].postalCode) {
      expect(typeof contactWithAddresses.addresses[0].postalCode).toBe(
        "string"
      );
    }
  });

  it("should return empty array if no contacts found", async () => {
    const res = await request(config.baseURL)
      .get("/contact")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Contacts fetched successfully");
    expect(res.body.data).toBeDefined();
    expect(res.body.data.length).toBe(0);
  });
});

describe("GET /contact/:id", () => {
  beforeEach(async () => {
    await createUser(userData);
    user = await getUser(userData.email);
    sessionId = await createSession(user.email);
  });

  afterEach(async () => {
    await deleteUser(userData.email);
  });

  it("should cannot access api without session", async () => {
    const res = await request(config.baseURL).get("/contact/1");

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe("Not Authorized!");
  });

  it("should get contact with id successfully if contact.id exists", async () => {
    await createContact(user.id, true);

    const contacts = await getContacts(user.id);
    const contact = contacts[0];

    const res = await request(config.baseURL)
      .get(`/contact/${contact.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Contact fetched successfully");
    expect(typeof res.body.data.fullName).toBe("string");
    expect(typeof res.body.data.phoneNumber).toBe("string");
    expect(res.body.data.createdAt).toBeUndefined();
    expect(res.body.data.updatedAt).toBeUndefined();

    if (res.body.data.nickName) {
      expect(typeof res.body.data.nickName).toBe("string");
    }

    if (res.body.data.email) {
      expect(typeof res.body.data.email).toBe("string");
    }

    expect(typeof contact.addresses[0].street).toBe("string");
    expect(contact.addresses[0].createdAt).toBeUndefined();
    expect(contact.addresses[0].updatedAt).toBeUndefined();

    if (contact.addresses[0].city) {
      expect(typeof contact.addresses[0].city).toBe("string");
    }
    if (contact.addresses[0].district) {
      expect(typeof contact.addresses[0].district).toBe("string");
    }
    if (contact.addresses[0].subDistrict) {
      expect(typeof contact.addresses[0].subDistrict).toBe("string");
    }
    if (contact.addresses[0].postalCode) {
      expect(typeof contact.addresses[0].postalCode).toBe("string");
    }
  });

  it("should get contact with id successfully if contact.id exists and addresses is empty array if contact has no addresses", async () => {
    await createContact(user.id, false);

    const contacts = await getContacts(user.id);
    const contact = contacts[0];

    const res = await request(config.baseURL)
      .get(`/contact/${contact.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Contact fetched successfully");
    expect(typeof res.body.data.fullName).toBe("string");
    expect(typeof res.body.data.phoneNumber).toBe("string");
    expect(res.body.data.addresses).toBeDefined();
    expect(res.body.data.addresses.length).toBe(0);
    expect(res.body.data.createdAt).toBeUndefined();
    expect(res.body.data.updatedAt).toBeUndefined();

    if (res.body.data.nickName) {
      expect(typeof res.body.data.nickName).toBe("string");
    }

    if (res.body.data.email) {
      expect(typeof res.body.data.email).toBe("string");
    }
  });

  it("should return error with status 404 if contact.id does not exist", async () => {
    const res = await request(config.baseURL)
      .get("/contact/0")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(404);
    expect(res.body.errorMsg).toBe("Contact not found");
    expect(res.body.data).toBeUndefined();
  });
});

describe("POST /contact", () => {
  beforeEach(async () => {
    await createUser(userData);
    user = await getUser(userData.email);
    sessionId = await createSession(user.email);
  });

  afterEach(async () => {
    await deleteUser(userData.email);
  });

  it("should cannot access api without session", async () => {
    const res = await request(config.baseURL).post("/contact");

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe("Not Authorized!");
  });

  it("should create contact with valid fields successfully", async () => {
    const addresses = Array.from({ length: 2 }, () => ({
      street: faker.location.street(),
      city: faker.location.city(),
      district: faker.location.state(),
      subDistrict: faker.location.state(),
      postalCode: faker.location.zipCode(),
    }));

    const contact = {
      fullName: faker.person.fullName(),
      nickName: faker.person.firstName(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      addresses,
    };

    const res = await request(config.baseURL)
      .post("/contact")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(contact);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Contact added successfully");
  });

  it("should create contact only with required fields successfully", async () => {
    const contact = {
      fullName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    };

    const res = await request(config.baseURL)
      .post("/contact")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(contact);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Contact added successfully");
  });

  it("should fail to create contact without required fields", async () => {
    const contact = {
      nickName: faker.person.firstName(),
    };

    const res = await request(config.baseURL)
      .post("/contact")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(contact);

    expect(res.status).toBe(400);
  });
});

describe("PUT /contact/:id", () => {
  beforeEach(async () => {
    await createUser(userData);
    user = await getUser(userData.email);
    sessionId = await createSession(user.email);
  });

  afterEach(async () => {
    await deleteUser(userData.email);
  });

  it("should cannot access api without session", async () => {
    const res = await request(config.baseURL).put("/contact/1");

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe("Not Authorized!");
  });

  it("should update existing contact with valid fields successfully", async () => {
    await createContact(user.id, true);
    const [existingContact] = await getContacts(user.id);

    const addresses = Array.from({ length: 2 }, () => ({
      street: faker.location.street(),
      city: faker.location.city(),
      district: faker.location.state(),
      subDistrict: faker.location.state(),
      postalCode: faker.location.zipCode(),
    }));

    const contact = {
      fullName: faker.person.fullName(),
      nickName: faker.person.firstName(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      addresses,
    };

    const res = await request(config.baseURL)
      .put(`/contact/${existingContact.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(contact);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Contact updated successfully");

    const updatedContact = await getContactById(existingContact.id);

    expect(updatedContact).toStrictEqual({
      id: existingContact.id,
      fullName: contact.fullName,
      nickName: contact.nickName,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
      addresses: contact.addresses,
    });
  });

  it("should update existing contact only with required fields successfully", async () => {
    await createContact(user.id, true);
    const [existingContact] = await getContacts(user.id);

    const contact = {
      fullName: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
    };

    const res = await request(config.baseURL)
      .put(`/contact/${existingContact.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(contact);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Contact updated successfully");

    const updatedContact = await getContactById(existingContact.id);

    expect(updatedContact).toStrictEqual({
      id: existingContact.id,
      fullName: contact.fullName,
      nickName: null,
      phoneNumber: contact.phoneNumber,
      email: null,
      addresses: [],
    });
  });

  it("should fail to update existing contact without required fields", async () => {
    await createContact(user.id, true);
    const [existingContact] = await getContacts(user.id);

    const contact = {
      nickName: faker.person.firstName(),
    };

    const res = await request(config.baseURL)
      .put(`/contact/${existingContact.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(contact);

    expect(res.status).toBe(400);
  });

  it("should fail to update non-existing contact", async () => {
    const addresses = Array.from({ length: 2 }, () => ({
      street: faker.location.street(),
      city: faker.location.city(),
      district: faker.location.state(),
      subDistrict: faker.location.state(),
      postalCode: faker.location.zipCode(),
    }));

    const contact = {
      fullName: faker.person.fullName(),
      nickName: faker.person.firstName(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      addresses,
    };

    const res = await request(config.baseURL)
      .put("/contact/0")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(contact);

    expect(res.status).toBe(404);
    expect(res.body.errorMsg).toBe("Contact not found");
  });
});

describe("DELETE /contact/:id", () => {
  beforeEach(async () => {
    await createUser(userData);
    user = await getUser(userData.email);
    sessionId = await createSession(user.email);
  });

  afterEach(async () => {
    await deleteUser(userData.email);
  });

  it("should cannot access api without session", async () => {
    const res = await request(config.baseURL).delete("/contact/1");

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe("Not Authorized!");
  });

  it("should delete existing contact successfully", async () => {
    await createContact(user.id, true);
    const [existingContact] = await getContacts(user.id);

    const res = await request(config.baseURL)
      .delete(`/contact/${existingContact.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Contact deleted successfully");

    const updatedContact = await getContactById(existingContact.id);

    expect(updatedContact).toBeNull();
  });

  it("should delete existing contact successfully even if some groups contain the contact", async () => {
    await createContact(user.id, true);
    await createGroups(user.id, 1);

    const [existingContact] = await getContacts(user.id);
    const [existingGroup] = await getGroups(user.id);

    await createGroupMembers(existingGroup.id, [existingContact.id]);

    const res = await request(config.baseURL)
      .delete(`/contact/${existingContact.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Contact deleted successfully");

    const updatedContact = await getContactById(existingContact.id);

    expect(updatedContact).toBeNull();
  });

  it("should fail to delete non-existing contact", async () => {
    const res = await request(config.baseURL)
      .delete("/contact/0")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(404);
    expect(res.body.errorMsg).toBe("Contact not found");
  });
});
