"use strict";

module.exports = {
 async up(queryInterface, Sequelize) {
  return queryInterface.sequelize.transaction((t) => {
   return queryInterface.addColumn(
    "ChannelJobs",
    "user_id",
    {
     type: Sequelize.DataTypes.STRING,
     allowNull: true,
     defaultValue: null,
    },
    { transaction: t }
   );
  });
 },

 async down(queryInterface, Sequelize) {
  return queryInterface.sequelize.transaction((t) => {
   return queryInterface.removeColumn("ChannelJobs", "user_id", {
    transaction: t,
   });
  });
 },
};
