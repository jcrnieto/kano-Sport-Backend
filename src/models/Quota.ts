import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Student from './Student';

interface QuotaAttributes {
  id: number;
  student_id: number;
  paymentDate: Date;
  expirationDate: Date;
  amount: number;
}

type QuotaCreationAttributes = Optional<QuotaAttributes, 'id'>;

class Quota extends Model<QuotaAttributes, QuotaCreationAttributes>
  implements QuotaAttributes {
  public id!: number;
  public student_id!: number;
  public paymentDate!: Date;
  public expirationDate!: Date;
  public amount!: number;
}

Quota.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  student_id: { type: DataTypes.INTEGER, allowNull: false },
  paymentDate: { type: DataTypes.DATEONLY, allowNull: false },
  expirationDate: { type: DataTypes.DATEONLY, allowNull: false },
  amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, {
  sequelize,
  tableName: 'cuotas',
  timestamps: false,
});

Student.hasMany(Quota, { foreignKey: 'student_id' });
Quota.belongsTo(Student, { foreignKey: 'student_id' });

export default Quota;

