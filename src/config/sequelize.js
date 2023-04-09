import { URL } from "url";
import { config as configDotEnv } from "dotenv";

configDotEnv();

const DATABASE_URL = process.env.DATABASE_URL || "";
const DATABASE_SSL = process.env.DATABASE_SSL || false;
const DATABASE_LOGGING = process.env.DATABASE_LOGGING.includes("false") ? false : true;

// https://bleepcoder.com/es/sequelize/20454794/can-t-use-ssl-with-postgres
let url = new URL(DATABASE_URL);

const config = {
 username: url.username,
 password: url.password,
 host: url.hostname,
 port: url.port,
 database: url.pathname.replace("/", ""),
 dialect: "postgres",
};

module.exports = {
 production: {
  ...config,
  dialectOptions:
   DATABASE_SSL ? {
    // https://stackoverflow.com/questions/58965011/sequelizeconnectionerror-self-signed-certificate
    ssl: {
     require: true,
     rejectUnauthorized: false
    }
   } : {},
  logging: DATABASE_LOGGING
 },
 development: {
  username: process.env.DEVELOPMENT_DATABASE_USERNAME,
  password: process.env.DEVELOPMENT_DATABASE_PASSWORD,
  host: process.env.DEVELOPMENT_DATABASE_HOST,
  port: process.env.DEVELOPMENT_DATABASE_PORT,
  database: process.env.DEVELOPMENT_DATABASE_NAME,
  dialect: "postgres",
  logging: DATABASE_LOGGING
 },
 test: {
  username: process.env.DEVELOPMENT_DATABASE_USERNAME,
  password: process.env.DEVELOPMENT_DATABASE_PASSWORD,
  host: process.env.DEVELOPMENT_DATABASE_HOST,
  port: process.env.DEVELOPMENT_DATABASE_PORT,
  database: process.env.DEVELOPMENT_DATABASE_NAME,
  dialect: "postgres",
  logging: DATABASE_LOGGING,
 }
};
