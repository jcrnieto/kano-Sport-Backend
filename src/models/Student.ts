import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface StudentAttributes {
  id: number;
  dni: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento?: Date;
}

type StudentCreationAttributes = Optional<StudentAttributes, 'id'>;

class Student extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes {
  public id!: number;
  public dni!: string;
  public nombre!: string;
  public apellido!: string;
  public fecha_nacimiento?: Date;
}

Student.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  dni: { type: DataTypes.STRING, allowNull: false, unique: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido: { type: DataTypes.STRING, allowNull: false },
  fecha_nacimiento: { type: DataTypes.DATEONLY, allowNull: true },
}, {
  sequelize,
  tableName: 'students',
  timestamps: false,
});

export default Student;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Student = sequelize.define('Student', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   dni: { type: DataTypes.STRING, allowNull: false, unique: true },
//   nombre: { type: DataTypes.STRING, allowNull: false },
//   apellido: { type: DataTypes.STRING, allowNull: false },
//   fecha_nacimiento: { type: DataTypes.DATEONLY, allowNull: true },
// }, {
//   tableName: 'students',
//   timestamps: false,
// });

// module.exports = Student;
