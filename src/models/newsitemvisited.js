'use strict';
const {
  Model
} = require('sequelize');

/**
 *
 * @typedef {{news_item_uuid: string;}} NewsItemVisitedAttributes
 */

/**
 * @param {import("sequelize")} sequelize
 * @param {import("sequelize").DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  class NewsItemVisited extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  NewsItemVisited.init({
    news_item_uuid: DataTypes.STRING,
    guild_id: DataTypes.STRING,
    rss: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NewsItemVisited',
  });
  return NewsItemVisited;
};
