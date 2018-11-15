'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users_online_times = sequelize.define('Users_online_times', {
    username: DataTypes.STRING,
    users_online_times: DataTypes.BIGINT
  }, {});
  Users_online_times.associate = function(models) {
    // associations can be defined here
  };
  return Users_online_times;
};