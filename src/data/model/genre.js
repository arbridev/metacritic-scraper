const { DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;

const Genre = sequelize.define("genre", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});

module.exports = Genre;