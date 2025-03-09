const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,  // Make phone the primary key
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});

module.exports = User;
