import Logger from "@app/Logger";
import { access, constants } from "fs/promises";
import exec from "@app/node-extensions/exec";

const isSoftMigrate = {
 assert: false
}

const logger = new Logger();

export async function isMigratedDb() {
 let migratedDb = false

 try {
  await access(".database-migrate", constants.F_OK);
  migratedDb = true;
 } catch (e) {
  logger.warn(e);
 }
 return migratedDb;
}

export async function migrateDb() {

 const migratedDb = await isMigratedDb();

 console.log({
  migratedDb,
  isSoftMigrate
 })

 if (!migratedDb && !isSoftMigrate.assert) {
  const result = await exec("npm run pretest");
  logger.log("[Result DB Migrate]", result);
  isSoftMigrate.assert = true;
 }
}

export async function rollbackDb() {
 const result = await exec("npm run posttest");
 logger.log("[Result DB rollback]", result);
}