import request from "supertest";
import config from "../config";
import { createUser, deleteUser } from "../util/test-util";
import { newUser, user } from "../data/data";

describe("POST /auth/register", () => {
  it("should register successfully with new email and phoneNumber", async () => {
    await deleteUser(newUser.email);
    await deleteUser(newUser.phoneNumber);

    const res = await request(config.baseURL)
      .post("/auth/register")
      .set("Content-Type", "application/json")
      .send(newUser);

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should fail to register with existing email", async () => {
    await createUser(user);

    const res = await request(config.baseURL)
      .post("/auth/register")
      .set("Content-Type", "application/json")
      .send(user);

    expect(res.status).toBe(400);
    expect(res.body.errorMsg).toBe("Email or phone number already used");
  });
});

describe("POST /auth/login", () => {
  beforeAll(async () => {
    await createUser(user);
  });

  afterAll(async () => {
    await deleteUser(user.email);
  });

  it("should login successfully with valid email and password", async () => {
    const res = await request(config.baseURL)
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send({
        emailOrPhoneNumber: user.email,
        password: user.password,
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User logged in successfully");
    expect(typeof res.body.data.sessionId).toBe("string");
    expect(typeof res.body.data.expiresAt).toBe("number");
  });

  it("should login successfully with valid phoneNumber and password", async () => {
    const res = await request(config.baseURL)
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send({
        emailOrPhoneNumber: user.phoneNumber,
        password: user.password,
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User logged in successfully");
    expect(typeof res.body.data.sessionId).toBe("string");
    expect(typeof res.body.data.expiresAt).toBe("number");
  });

  it("should fail to login with invalid email or phoneNumber", async () => {
    const invalidEmailOrPhoneNumber = "invalidEmailOrPhoneNumber";

    const res = await request(config.baseURL)
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send({
        emailOrPhoneNumber: invalidEmailOrPhoneNumber,
        password: user.password,
      });

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe(
      "Email, phone number, or password is incorrect"
    );
  });

  it("should fail to login with wrong password", async () => {
    const wrongPassword = "wrongPassword";

    const res = await request(config.baseURL)
      .post("/auth/login")
      .set("Content-Type", "application/json")
      .send({
        emailOrPhoneNumber: user.email,
        password: wrongPassword,
      });

    expect(res.status).toBe(401);
    expect(res.body.errorMsg).toBe(
      "Email, phone number, or password is incorrect"
    );
  });
});
