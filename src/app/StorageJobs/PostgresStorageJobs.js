import { Op } from "sequelize";
import PostgresSequealize from "../PostgresSequelize";

export default class PostgresStorageJobs {
 /**
  *
  * @returns
  */
 isAsync = () => true;
 /**
  *
  * @returns {void}
  */
 init = async () => {
  await this.createORM();
 };
 /**
  *
  * @returns {Promise}
  */
 destroy = () => {
  return this.orm.disconnect();
 };
 /**
  *
  * @returns {Sequelize}
  */
 createORM = async () => {
  this.orm = new PostgresSequealize();
  return await this.orm.connect();
 };
 /**
  *
  * @returns {Sequelize.Model}
  */
 getModelJob = () => {
  return this.orm.getModel("ChannelJob");
 };
 /**
  *
  * @returns {Models.ChannelJob}
  */
 insert = async ({ job_type, channel_id, config }) => {
  const ChannelJob = this.getModelJob();
  return await ChannelJob.create({ job_type, channel_id, config });
 };
 /**
  *
  * @returns {Promise<Model|null>}
  */
 find = async ({ job_type, channel_id }) => {
  return await this.getModelJob().findOne({
   where: {
    [Op.and]: [{ job_type }, { channel_id }],
   },
  });
 };
 /**
  *
  * @returns {Promise<Array<Model>>}
  */
 findAll = async ({ job_type }) => {
  return await this.getModelJob().findAll({
   where: {
    [Op.and]: [{ job_type }],
   },
  });
 };
}
