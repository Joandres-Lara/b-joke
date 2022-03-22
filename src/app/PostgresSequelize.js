import configs from "../config/sequelize";
import { Sequelize, DataTypes } from "sequelize";
import path from "path";
import fs from "fs/promises";

/**
 * @typedef {import("sequelize")} Sequelize
 * @typedef {import("sequelize").DataTypes} DataTypes
 *
 * @typedef {{
 *  ChannelJob: (typeof import("sequelize").Model);
 *  NewsItemVisited: (typeof import("sequelize").Model);
 * }} RecordModels
 */
export default class PostgresSequelize {
 /**
  *
  * @type {Sequelize}
  */
 static instance;
 /**
  *
  * @type {RecordModels}
  */
 static models = {};
 /**
  *
  * @returns
  */
 static getInstance = () => {
  if (!PostgresSequelize.instance) {
   throw new Error(
    "Instance is not initialize, call `connect` before get instance"
   );
  }
  return PostgresSequelize.instance;
 };
 /**
  *
  * @returns {Sequelize}
  */
 getInstance = () => PostgresSequelize.getInstance();
 /**
  *
  * @returns {Promise<PostgresSequelize>}
  */
 initializeModels = async () => {
  if (
   Object.keys(PostgresSequelize.models).length === 0 &&
   this.getInstance()
  ) {
   const modelPath = path.resolve("src/models");
   const files = await fs.readdir(modelPath);
   // Establece los valores por referencia.
   let models = (PostgresSequelize.models = {});
   // Obtiene los modelos de manera asincrónica
   // de manera que se puedan crear todas las instancias.
   await Promise.all(
    files.map(async (file) => {
     /** @type {{(sequelize: Sequelize, DataTypes: DataTypes) => (typeof import("sequelize").Model) }} */
     const caller = (await import(path.join(modelPath, file))).default;
     const model = await caller(this.getInstance(), DataTypes);
     models[model.name] = model;
     return true;
    })
   );
  }
  return this;
 };
 /**
  *
  * @param {'ChannelJob'|'NewsItemVisited'} modelName
  * @returns {(typeof import("sequelize").Model)}
  */
 getModel = (modelName) => {
  return PostgresSequelize.models[modelName];
 };
 /**
  *
  * @returns {Promise<PostgresSequelize>}
  */
 connect = async () => {
  if (!PostgresSequelize.instance) {
   // La conexión y la obtención de la configuración
   // deberían estar aquí dentro.
   try {
    const config = configs[process.env.NODE_ENV || "development"];
    PostgresSequelize.instance = new Sequelize(config);
    await PostgresSequelize.instance.authenticate();
    console.log("Connection has been established successfully.");
   } catch (error) {
    PostgresSequelize.instance = null;
    console.error("Unable to connect to the database:", error);
    return process.exit(0);
   }
  }

  await this.initializeModels();

  return this;
 };
 /**
  *
  * @returns {Promise<void>}
  */
 async disconnect() {
  if (PostgresSequelize.instance) {
   try {
    await PostgresSequelize.instance.close();
    delete PostgresSequelize.instance;
   } catch (e) {
    console.error(e);
   }
  }
 }
}
