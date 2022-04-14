import chai from "chai";
import request from "supertest";
import app from "../app.js";

chai.should();

describe("404", () => {
  it("invalid endpoint post", async () => {
    await request(app).post("/abc").send().expect(404);
  });

  it("invalid endpoint get", async () => {
    await request(app).get("/123").expect(404);
  });
});
