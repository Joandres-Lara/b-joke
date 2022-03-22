"use strict";
const { Model } = require("sequelize");

/**
 * @typedef {{
 *  job_type: string;
 *  channel_id: number,
 *  user_id?: number;
 *  config:
 *    import("@jobs/schedule-types/RecordJobSchedule").ConfigRecordJobSchedule
 *  | import("@jobs/schedule-types/JokeApiJobSchedule").ConfigJokeApiJokeSchedule
 * }} ChannelProperties
 * @typedef {import("sequelize").Model<ChannelProperties>} ChannelJob
 */

/**
 * @param {import("sequelize")} sequelize
 * @param {import("sequelize").DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
 class ChannelJob extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
   // define association here
  }
 }
 ChannelJob.init(
  {
   job_type: DataTypes.STRING,
   channel_id: DataTypes.STRING,
   user_id: DataTypes.STRING,
   config: DataTypes.JSON,
  },
  {
   sequelize,
   modelName: "ChannelJob",
  }
 );
 return ChannelJob;
};
