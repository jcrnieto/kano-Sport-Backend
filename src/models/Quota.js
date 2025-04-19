const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./Student');

const Quota = sequelize.define('Quota', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  alumno_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'alumnos',
      key: 'id',
    },
    allowNull: false,
  },
  fecha_pago: { type: DataTypes.DATEONLY, allowNull: false },
  fecha_vencimiento: { type: DataTypes.DATEONLY, allowNull: false },
  monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, {
  tableName: 'Quotas',
  timestamps: false,
});

Student.hasMany(Quota, { foreignKey: 'alumno_id' });
Quota.belongsTo(Student, { foreignKey: 'alumno_id' });

module.exports = Quota;
