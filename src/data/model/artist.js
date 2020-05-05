const { DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;

const Artist = sequelize.define("artist", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false
});

module.exports = Artist;