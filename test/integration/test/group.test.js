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
  getContacts,
  getGroupById,
  getGroups,
  getUser,
} from "../util/test-util";
import { user as userData } from "../data/data";
import { faker } from "@faker-js/faker";
import knex from "../db/knex";

let sessionId;
let user;

describe("GET /group", () => {
  beforeEach(async () => {
    await createUser(userData);
    user = await getUser(userData.email);
    sessionId = await createSession(user.email);
  });

  afterEach(async () => {
    await deleteUser(userData.email);
  });

  it("should cannot access api without session", async () => {
    const res = await request(config.baseURL).get("/group");

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe("Not Authorized!");
  });

  it("should get all groups successfully", async () => {
    await createGroups(user.id, 3);
    await createContacts(user.id, 5);

    const groups = await getGroups(user.id);
    const contacts = await getContacts(user.id);

    for (let i = 0; i < groups.length; i++) {
      await createGroupMembers(
        groups[i].id,
        contacts.slice(contacts.length - (i + 1)).map((contact) => contact.id)
      );
    }
    const res = await request(config.baseURL)
      .get("/group")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Groups fetched successfully");
    expect(res.body.data.length).toBe(3);
    expect(typeof res.body.data[0].name).toBe("string");

    if (res.body.data[0].description) {
      expect(typeof res.body.data[0].description).toBe("string");
    }

    expect(res.body.data[0].members.length).toBeGreaterThanOrEqual(0);
    expect(res.body.data[0].members.length).toBeLessThanOrEqual(5);

    if (res.body.data[0].members.length > 0) {
      expect(typeof res.body.data[0].members[0].fullName).toBe("string");
      expect(typeof res.body.data[0].members[0].phoneNumber).toBe("string");
      expect(res.body.data[0].members[0].addresses).toBeDefined();
      expect(res.body.data[0].members[0].addresses.length).toBeDefined();
    }
  });

  it("should return empty array if no groups found", async () => {
    const res = await request(config.baseURL)
      .get("/group")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Groups fetched successfully");
    expect(res.body.data).toBeDefined();
    expect(res.body.data.length).toBe(0);
  });
});

describe("GET /group/:id", () => {
  beforeEach(async () => {
    await createUser(userData);
    user = await getUser(userData.email);
    sessionId = await createSession(user.email);
  });

  afterEach(async () => {
    await deleteUser(userData.email);
  });

  it("should cannot access api without session", async () => {
    const res = await request(config.baseURL).get("/group/1");

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe("Not Authorized!");
  });

  it("should get group with id successfully if group.id exists", async () => {
    await createContact(user.id, true);
    await createGroups(user.id, 1);

    const [existingContact] = await getContacts(user.id);
    const [existingGroup] = await getGroups(user.id);

    await createGroupMembers(existingGroup.id, [existingContact.id]);

    const res = await request(config.baseURL)
      .get(`/group/${existingGroup.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Group fetched successfully");
    expect(typeof res.body.data.name).toBe("string");
    expect(typeof res.body.data.description).toBe("string");
    expect(res.body.data.createdAt).toBeUndefined();
    expect(res.body.data.updatedAt).toBeUndefined();
    expect(typeof res.body.data.members[0].fullName).toBe("string");
    expect(typeof res.body.data.members[0].phoneNumber).toBe("string");
    expect(typeof res.body.data.members[0].addresses[0].street).toBe("string");
    expect(res.body.data.members[0].addresses[0].createdAt).toBeUndefined();
    expect(res.body.data.members[0].addresses[0].updatedAt).toBeUndefined();
    expect(typeof res.body.data.members[0].addresses[0].city).toBe("string");
    expect(typeof res.body.data.members[0].addresses[0].district).toBe(
      "string"
    );
    expect(typeof res.body.data.members[0].addresses[0].subDistrict).toBe(
      "string"
    );
    expect(typeof res.body.data.members[0].addresses[0].postalCode).toBe(
      "string"
    );
  });

  it("should get group with id successfully if group.id exists and members is empty array if group has no members", async () => {
    await createGroups(user.id, 1);

    const [existingGroup] = await getGroups(user.id);

    const res = await request(config.baseURL)
      .get(`/group/${existingGroup.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Group fetched successfully");
    expect(typeof res.body.data.name).toBe("string");
    expect(typeof res.body.data.description).toBe("string");
    expect(res.body.data.members).toBeDefined();
    expect(res.body.data.members.length).toBe(0);
    expect(res.body.data.createdAt).toBeUndefined();
    expect(res.body.data.updatedAt).toBeUndefined();
  });

  it("should return error with status 404 if group.id does not exist", async () => {
    const res = await request(config.baseURL)
      .get("/group/0")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(404);
    expect(res.body.errorMsg).toBe("Group not found");
    expect(res.body.data).toBeUndefined();
  });
});

describe("POST /group", () => {
  beforeEach(async () => {
    await createUser(userData);
    user = await getUser(userData.email);
    sessionId = await createSession(user.email);
  });

  afterEach(async () => {
    await deleteUser(userData.email);
  });

  it("should cannot access api without session", async () => {
    const res = await request(config.baseURL).post("/group");

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe("Not Authorized!");
  });

  it("should create group with valid fields successfully", async () => {
    const group = {
      name: faker.word.noun(),
      description: faker.lorem.sentence(),
    };

    const res = await request(config.baseURL)
      .post("/group")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(group);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Group added successfully");
  });

  it("should create group only with required fields successfully", async () => {
    const group = {
      name: faker.word.noun(),
    };

    const res = await request(config.baseURL)
      .post("/group")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(group);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Group added successfully");
  });

  it("should fail to create group without required fields", async () => {
    const group = {
      description: faker.lorem.sentence(),
    };

    const res = await request(config.baseURL)
      .post("/group")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(group);

    expect(res.status).toBe(400);
  });
});

describe("PUT /group/:id", () => {
  beforeEach(async () => {
    await createUser(userData);
    user = await getUser(userData.email);
    sessionId = await createSession(user.email);
  });

  afterEach(async () => {
    await deleteUser(userData.email);
  });

  it("should cannot access api without session", async () => {
    const res = await request(config.baseURL).put("/group/1");

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe("Not Authorized!");
  });

  it("should update existing group with valid fields successfully", async () => {
    await createGroups(user.id, 1);
    const [existingGroup] = await getGroups(user.id);

    const group = {
      name: faker.word.noun(),
      description: faker.lorem.sentence(),
    };

    const res = await request(config.baseURL)
      .put(`/group/${existingGroup.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(group);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Group updated successfully");

    const updatedGroup = await getGroupById(existingGroup.id);

    expect(updatedGroup).toStrictEqual({
      id: existingGroup.id,
      name: group.name,
      description: group.description,
    });
  });

  it("should update existing group only with required fields successfully", async () => {
    await createGroups(user.id, 1);
    const [existingGroup] = await getGroups(user.id);

    const group = {
      name: faker.word.noun(),
    };

    const res = await request(config.baseURL)
      .put(`/group/${existingGroup.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(group);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Group updated successfully");

    const updatedGroup = await getGroupById(existingGroup.id);

    expect(updatedGroup).toStrictEqual({
      id: existingGroup.id,
      name: group.name,
      description: null,
    });
  });

  it("should fail to update existing group without required fields", async () => {
    await createGroups(user.id, 1);
    const [existingGroup] = await getGroups(user.id);

    const group = {
      description: faker.lorem.sentence(),
    };

    const res = await request(config.baseURL)
      .put(`/group/${existingGroup.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(group);

    expect(res.status).toBe(400);
  });

  it("should fail to update non-existing group", async () => {
    const group = {
      name: faker.word.noun(),
      description: faker.lorem.sentence(),
    };

    const res = await request(config.baseURL)
      .put("/group/0")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send(group);

    expect(res.status).toBe(404);
    expect(res.body.errorMsg).toBe("Group not found");
  });
});

describe("DELETE /group/:id", () => {
  beforeEach(async () => {
    await createUser(userData);
    user = await getUser(userData.email);
    sessionId = await createSession(user.email);
  });

  afterEach(async () => {
    await deleteUser(userData.email);
  });

  it("should cannot access api without session", async () => {
    const res = await request(config.baseURL).delete("/group/1");

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe("Not Authorized!");
  });

  it("should delete existing group successfully", async () => {
    await createGroups(user.id, 1);
    const [existingGroup] = await getGroups(user.id);

    const res = await request(config.baseURL)
      .delete(`/group/${existingGroup.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Group deleted successfully");

    const updatedGroup = await getGroupById(existingGroup.id);

    expect(updatedGroup).toBeNull();
  });

  it("should delete existing group successfully even if group contain some groups", async () => {
    await createContact(user.id, true);
    await createGroups(user.id, 1);

    const [existingContact] = await getContacts(user.id);
    const [existingGroup] = await getGroups(user.id);

    await createGroupMembers(existingGroup.id, [existingContact.id]);

    const res = await request(config.baseURL)
      .delete(`/group/${existingGroup.id}`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Group deleted successfully");

    const updatedGroup = await getGroupById(existingGroup.id);

    expect(updatedGroup).toBeNull();
  });

  it("should fail to delete non-existing group", async () => {
    const res = await request(config.baseURL)
      .delete("/group/0")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId);

    expect(res.status).toBe(404);
    expect(res.body.errorMsg).toBe("Group not found");
  });
});

describe("POST /group/:id/member", () => {
  beforeEach(async () => {
    await createUser(userData);
    user = await getUser(userData.email);
    sessionId = await createSession(user.email);
  });

  afterEach(async () => {
    await deleteUser(userData.email);
  });

  it("should cannot access api without session", async () => {
    const res = await request(config.baseURL).post("/group/1/member");

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe("Not Authorized!");
  });

  it("should add existing contact to existing group successfully", async () => {
    await createContact(user.id, true);
    await createGroups(user.id, 1);

    const [existingContact] = await getContacts(user.id);
    const [existingGroup] = await getGroups(user.id);

    const res = await request(config.baseURL)
      .post(`/group/${existingGroup.id}/member`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send({
        contactId: existingContact.id,
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Group member added successfully");
  });

  it("should fail to add existing contact to existing group if contact already added", async () => {
    await createContact(user.id, true);
    await createGroups(user.id, 1);

    const [existingContact] = await getContacts(user.id);
    const [existingGroup] = await getGroups(user.id);

    await createGroupMembers(existingGroup.id, [existingContact.id]);

    const res = await request(config.baseURL)
      .post(`/group/${existingGroup.id}/member`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send({
        contactId: existingContact.id,
      });

    expect(res.status).toBe(400);
    expect(res.body.errorMsg).toBe("Group member already exists");
  });

  it("should fail to add non-existing contact to existing group", async () => {
    await createGroups(user.id, 1);

    const [existingGroup] = await getGroups(user.id);

    const res = await request(config.baseURL)
      .post(`/group/${existingGroup.id}/member`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send({
        contactId: 0,
      });

    expect(res.status).toBe(400);
    expect(res.body.errorMsg).toBe("Contact not found");
  });

  it("should fail to add member to non-existing group", async () => {
    const res = await request(config.baseURL)
      .post("/group/0/member")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send({
        contactId: 0,
      });

    expect(res.status).toBe(404);
    expect(res.body.errorMsg).toBe("Group not found");
  });
});

describe("DELETE /group/:id/member", () => {
  beforeEach(async () => {
    await createUser(userData);
    user = await getUser(userData.email);
    sessionId = await createSession(user.email);
  });

  afterEach(async () => {
    await deleteUser(userData.email);
  });

  it("should cannot access api without session", async () => {
    const res = await request(config.baseURL).delete("/group/1/member");

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe("Not Authorized!");
  });

  it("should success to delete existing contact from existing group if contact already added", async () => {
    await createContact(user.id, true);
    await createGroups(user.id, 1);

    const [existingContact] = await getContacts(user.id);
    const [existingGroup] = await getGroups(user.id);

    await createGroupMembers(existingGroup.id, [existingContact.id]);

    const res = await request(config.baseURL)
      .delete(`/group/${existingGroup.id}/member`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send({
        contactId: existingContact.id,
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Group member deleted successfully");

    const groupMembers = await knex("group_members").where({
      group_id: existingGroup.id,
      contact_id: existingContact.id,
    });

    expect(groupMembers.length).toBe(0);
  });

  it("should success to delete existing contact from existing group even contact not added before", async () => {
    await createContact(user.id, true);
    await createGroups(user.id, 1);

    const [existingContact] = await getContacts(user.id);
    const [existingGroup] = await getGroups(user.id);

    const res = await request(config.baseURL)
      .delete(`/group/${existingGroup.id}/member`)
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send({
        contactId: existingContact.id,
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Group member deleted successfully");

    const groupMembers = await knex("group_members").where({
      group_id: existingGroup.id,
      contact_id: existingContact.id,
    });

    expect(groupMembers.length).toBe(0);
  });

  it("should fail to delete member to non-existing group", async () => {
    const res = await request(config.baseURL)
      .delete("/group/0/member")
      .set("Content-Type", "application/json")
      .set("X-Session-Id", sessionId)
      .send({
        contactId: 0,
      });

    expect(res.status).toBe(404);
    expect(res.body.errorMsg).toBe("Group not found");
  });
});
