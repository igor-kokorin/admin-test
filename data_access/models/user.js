const bcrypt = require('bcrypt');
const RoleEnum = require('../enums/role');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING
    },
    passwordHash: {
      field: 'password_hash',
      type: DataTypes.STRING,
      set() {
        throw new Error('Use setPassword method instead');
      }
    },
    role: {
      type: DataTypes.ENUM,
      values: Object.keys(RoleEnum)
    },
    locked: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
    }
  }, {
    tableName: 'users'
  });

  User.prototype.setPassword = async function(password) {
    if (!password) {
      throw new Error('You must provide value for password');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    this.setDataValue('passwordHash', hashedPassword);
  };

  User.prototype.checkPassword = async function(password) {
    if (!password) {
      throw new Error('You must provide value for password');
    }

    const isPasswordsMatching = await bcrypt.compare(password, this.getDataValue('passwordHash'));

    return isPasswordsMatching;
  };

  User.prototype.getRole = function() {
    const role = RoleEnum[this.getDataValue('role')];

    if (!role) {
      throw new Error('Role value is undefined');
    }

    return role;
  };

  User.prototype.updateValues = async function(data) {
    this.setDataValue('name', data.name);
    this.setDataValue('locked', data.locked);
    this.setDataValue('role', data.role);

    if (data.password) {
      await this.setPassword(data.password);
    }

    await this.save();
  }

  return User;
};