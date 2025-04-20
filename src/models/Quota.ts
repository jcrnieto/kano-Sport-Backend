import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Student from './Student';

interface QuotaAttributes {
  id: number;
  alumno_id: number;
  fecha_pago: Date;
  fecha_vencimiento: Date;
  monto: number;
}

type QuotaCreationAttributes = Optional<QuotaAttributes, 'id'>;

class Quota extends Model<QuotaAttributes, QuotaCreationAttributes>
  implements QuotaAttributes {
  public id!: number;
  public alumno_id!: number;
  public fecha_pago!: Date;
  public fecha_vencimiento!: Date;
  public monto!: number;
}

Quota.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  alumno_id: { type: DataTypes.INTEGER, allowNull: false },
  fecha_pago: { type: DataTypes.DATEONLY, allowNull: false },
  fecha_vencimiento: { type: DataTypes.DATEONLY, allowNull: false },
  monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, {
  sequelize,
  tableName: 'cuotas',
  timestamps: false,
});

Student.hasMany(Quota, { foreignKey: 'alumno_id' });
Quota.belongsTo(Student, { foreignKey: 'alumno_id' });

export default Quota;

// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');
// const Student = require('./Student');

// const Quota = sequelize.define('Quota', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   alumno_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'alumnos',
//       key: 'id',
//     },
//     allowNull: false,
//   },
//   fecha_pago: { type: DataTypes.DATEONLY, allowNull: false },
//   fecha_vencimiento: { type: DataTypes.DATEONLY, allowNull: false },
//   monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
// }, {
//   tableName: 'Quotas',
//   timestamps: false,
// });

// Student.hasMany(Quota, { foreignKey: 'alumno_id' });
// Quota.belongsTo(Student, { foreignKey: 'alumno_id' });

// module.exports = Quota;
