'use strict';
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    username: DataTypes.STRING,
    text: DataTypes.TEXT
  }, {});
  Messages.associate = function(models) {
    // associations can be defined here
  };
  return Messages;
};