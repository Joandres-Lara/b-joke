import PostgresStorage from "../PostgresStorage";
import { Op } from "sequelize";

export default class PostgresStorageJobs extends PostgresStorage {
 constructor(...args) {
  super(...args);
 }
 /**
  *
  */
 getModelJob() {
  return this.orm.getModel("ChannelJob");
 }
 /**
  *
  * @param {*} query
  * @returns
  */
 async queryFindAll(query) {
  return await this.getModelJob().findAll(query);
 }
 /**
  *
  * @param {import("sequelize").NonNullFindOptions} query
  * @returns
  */
 async queryFindOne(query) {
  return await this.getModelJob().findOne(query);
 }
 /**
  * @param {import("src/models/channeljob").ChannelProperties}
  * @returns {import("src/models/channeljob").ChannelJob}
  */
 async insert({ job_type, channel_id, config }) {
  const ChannelJob = this.getModelJob();
  const model_created = await ChannelJob.create({
   job_type,
   channel_id,
   config,
  });
  this.dispatchOnCreate(model_created);
  return model_created;
 }
 /**
  * @param {import("src/models/channeljob").ChannelProperties} arg[0]
  * @returns {Promise<false|import("src/models/channeljob").ChannelJob>}
  */
 async insertIfNotFind({ channel_id, job_type, user_id = null, config }) {
  if (await this.find({ job_type, channel_id, user_id })) {
   return false;
  }
  return await this.insert({ job_type, channel_id, user_id, config });
 }

 async findAndDelete({ channel_id, job_type }) {
  const job = await this.find({ job_type, channel_id });
  if (!job) {
   return;
  }
  return await job.destroy();
 }
 /**
  * @param {Partial<import("src/models/channeljob").ChannelProperties>} properties
  * @returns {Promise<Model|null>}
  */
 async find(properties) {
  return await this.queryFindOne({
   where: {
    [Op.and]: Object.entries(properties).map(([key, value]) => [
     { [key]: value },
    ]),
   },
  });
 }
 /**
  * @param {Partial<import("src/models/channeljob").ChannelProperties} properties
  * @returns {Promise<Model[]>}
  */
 async findAll(properties) {
  return await this.queryFindAll({
   where: {
    [Op.and]: Object.entries(properties).map(([key, value]) => [
     { [key]: value },
    ]),
   },
  });
 }
 /**
  *
  * @param {*} channel_id
  * @returns
  */
 async findAllByChannel(channel_id) {
  return await this.queryFindAll({
   where: {
    [Op.and]: [{ channel_id }],
   },
  });
 }
}
