'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users_online_times = sequelize.define('Users_online_times', {
    username: DataTypes.STRING,
    online_timestamp: DataTypes.DATE
  }, {});
  Users_online_times.associate = function(models) {
    // associations can be defined here
  };
  return Users_online_times;
};