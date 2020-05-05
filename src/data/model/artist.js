const { DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;

const Artist = sequelize.define("artist", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false
});

module.exports = Artist;