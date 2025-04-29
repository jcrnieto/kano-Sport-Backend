import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface StudentAttributes {
  id: number;
  dni: string;
  name: string;
  lastName: string;
  dateOfBirth?: Date | null;
  phone: string;
  address: string
}

type StudentCreationAttributes = Optional<StudentAttributes, 'id'>;

class Student extends Model<StudentAttributes, StudentCreationAttributes>
  implements StudentAttributes {
  public id!: number;
  public dni!: string;
  public name!: string;
  public lastName!: string;
  public dateOfBirth?: Date | null;
  public phone!: string;
  public address!: string
}

Student.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  dni: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  dateOfBirth: { type: DataTypes.DATEONLY, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  tableName: 'students',
  timestamps: false,
});

export default Student;
