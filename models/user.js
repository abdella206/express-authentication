'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Email must be valid'
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          meg: 'Invalid user name. Must be between 1 and 99 characters.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'password must be at least 8 characters.'
        }
      }
    }
  }, {
      hooks: {
        beforeCreate: function (pendingUser, option) {
          if (pendingUser && pendingUser.password) {
            var hash = bcrypt.hashSync(pendingUser.password, 12);
            pendingUser.password = hash;
          }

        }

      }
    });
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};