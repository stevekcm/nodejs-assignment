import mongoose from "mongoose";

export const mochaHooks = {
  beforeAll: async function () {
    mongoose.Promise = global.Promise;

    await mongoose.connect(process.env.DB_TEST);

    await mongoose.connection.db.dropDatabase();
  },

  afterAll: async function () {
    console.log("after all");
  },
};
