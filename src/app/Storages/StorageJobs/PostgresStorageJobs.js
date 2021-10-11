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
  * @returns {Promise<boolean|Models.ChannelJob>}
  */
 async insertIfNotFind({ channel_id, job_type, config }) {
  if (await this.find({ job_type, channel_id })) {
   return false;
  }
  return await this.insert({ job_type, channel_id, config });
 }

 async findAndDelete({ channel_id, job_type }){
  const job = await this.find({ job_type, channel_id });
  if(!job){
   return;
  }
  return await job.destroy();
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
  * @param {*} query
  * @returns
  */
 async queryFindAll(query){
  return await this.getModelJob().findAll(query);
 }
 /**
  *
  * @returns {Promise<Array<Model>>}
  */
 async findAll({ job_type }) {
  return await this.queryFindAll({
   where: {
    [Op.and]: [{ job_type }],
   },
  });
 }
 /**
  *
  * @param {*} channel_id
  * @returns
  */
 async findAllByChannel(channel_id){
  return await this.queryFindAll({
   where: {
    [Op.and]: [{ channel_id }],
   },
  });
 }
}
