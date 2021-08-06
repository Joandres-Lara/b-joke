import PostgresStorage from "../PostgresStorage";
import { Op } from "sequelize";

export default class PostgresStorageJobs extends PostgresStorage {
 constructor(...args) {
  super(...args);
 }
 /**
  *
  * @returns {Sequelize.Model}
  */
 getModelJob() {
  return this.orm.getModel("ChannelJob");
 }
 /**
  *
  * @returns {Models.ChannelJob}
  */
 async insert({ job_type, channel_id, config }) {
  const ChannelJob = this.getModelJob();
  return await ChannelJob.create({ job_type, channel_id, config });
 }
 /**
  *
  * @returns {Promise<boolean>}
  */
 async insertIfNotFind({ channel_id, job_type, config }) {
  if (!(await this.find({ job_type, channel_id }))) {
   return await this.insert({ job_type, channel_id, config });
  }
  return false;
 }
 /**
  *
  * @returns {Promise<Model|null>}
  */
 async find({ job_type, channel_id }) {
  return await this.getModelJob().findOne({
   where: {
    [Op.and]: [{ job_type }, { channel_id }],
   },
  });
 }
 /**
  *
  * @returns {Promise<Array<Model>>}
  */
 async findAll({ job_type }) {
  return await this.getModelJob().findAll({
   where: {
    [Op.and]: [{ job_type }],
   },
  });
 }
}
