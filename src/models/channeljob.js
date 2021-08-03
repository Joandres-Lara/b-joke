'use strict';
const {
  Model
} = require('sequelize');

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
  };
  ChannelJob.init({
    job_type: DataTypes.STRING,
    channel_id: DataTypes.STRING,
    config: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'ChannelJob',
  });
  return ChannelJob;
};
