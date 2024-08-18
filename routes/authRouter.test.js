import request from "supertest";

import sequelize from "../db/sequelize.js";
import app from "../app.js";
import User from "../db/models/User.js";

describe("test /login route", () => {
  afterAll(async () => {
    await User.destroy({
      where: { email: "test@example.com" },
    });
    await sequelize.close();
  });

  it("should return status code 200 and a token in the response", async () => {
    const registerResponse = await request(app)
      .post("/api/auth/register")
      .send({ email: "test@example.com", password: "password123" });

    expect(registerResponse.statusCode).toBe(201);

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toEqual({
      email: "test@example.com",
      subscription: "starter",
    });

    const updatedUser = await User.findOne({
      where: { email: "test@example.com" },
    });
    expect(updatedUser.token).toBe(response.body.token);
  });

  it("should return status code 401 for invalid credentials", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "invalid@example.com", password: "wrongpassword" });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Email or password is wrong");
  });
});
