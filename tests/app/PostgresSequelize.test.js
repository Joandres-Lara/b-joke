import PostgresSequelize from "@app/PostgresSequelize";
import sequelize from "sequelize";
import { migrateDb, rollbackDb } from "@util-tests/db-migrations";

describe("singleton instance postgress", () => {
 beforeAll(async () => {
  await migrateDb();
 });

 afterAll(async () => {
  // await rollbackDb();
 })

 it("Should throw when get instance", async () => {
  expect(async () => {
   await new PostgresSequelize().getInstance();
  }).rejects.toThrowError("Instance is not initialize, call `connect` before get instance");
 });

 it("Should throw when try connect", async () => {
  jest.spyOn(console, "error");
  jest.spyOn(process, "exit");
  jest.spyOn(sequelize, "Sequelize");

  console.error.mockImplementation(() => { });
  process.exit.mockImplementation(() => { });
  sequelize.Sequelize.mockImplementation(() => {
   return {
    authenticate: () => { throw new Error("Upsss connect not stablished"); }
   };
  });

  await (new PostgresSequelize()).connect();

  expect(sequelize.Sequelize).toHaveBeenCalled();

  expect(console.error).toHaveBeenCalled();
  expect(process.exit).toHaveBeenCalled();

  console.error.mockRestore();
  process.exit.mockRestore();
  sequelize.Sequelize.mockRestore();
 });
});

describe("Operations with connections", () => {
 let instance;

 beforeAll(async () => {
  await migrateDb();
  instance = new PostgresSequelize();
  await instance.connect();
 });

 beforeEach(async () => {
  await instance.connect();
 });

 afterAll(async () => {
  await instance.disconnect();
  // await rollbackDb();
 });

 it("Should connect database and disconnect", async () => {
  const instance = new PostgresSequelize();

  await instance.connect();

  expect(instance.getInstance()).toBeInstanceOf(sequelize.Sequelize);

  await instance.disconnect();

  expect(PostgresSequelize.instance).toBeUndefined();
 });

 it("Should get model", async () => {
  const instance = new PostgresSequelize();

  await instance.connect();

  expect(instance.getModel("ChannelJob")).toBeInstanceOf(Function);
 });
});
