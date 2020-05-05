const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db').sequelize;

class Album extends Model {}
Album.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  release: DataTypes.DATEONLY,
  url: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize, timestamps: false, modelName: 'album' });

module.exports = Album;