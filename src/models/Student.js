const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Student = sequelize.define('Student', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dni: { type: DataTypes.STRING, allowNull: false, unique: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido: { type: DataTypes.STRING, allowNull: false },
  fecha_nacimiento: { type: DataTypes.DATEONLY, allowNull: true },
}, {
  tableName: 'students',
  timestamps: false,
});

module.exports = Student;
