import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import Student from './Student';

interface QuotaAttributes {
  id: number;
  alumno_id: number;
  fechaPago: Date;
  fechaVencimiento: Date;
  monto: number;
}

type QuotaCreationAttributes = Optional<QuotaAttributes, 'id'>;

class Quota extends Model<QuotaAttributes, QuotaCreationAttributes>
  implements QuotaAttributes {
  public id!: number;
  public alumno_id!: number;
  public fechaPago!: Date;
  public fechaVencimiento!: Date;
  public monto!: number;
}

Quota.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  alumno_id: { type: DataTypes.INTEGER, allowNull: false },
  fechaPago: { type: DataTypes.DATEONLY, allowNull: false },
  fechaVencimiento: { type: DataTypes.DATEONLY, allowNull: false },
  monto: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, {
  sequelize,
  tableName: 'cuotas',
  timestamps: false,
});

Student.hasMany(Quota, { foreignKey: 'alumno_id' });
Quota.belongsTo(Student, { foreignKey: 'alumno_id' });

export default Quota;

