import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Admin extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

Admin.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  tableName: 'admins',
  timestamps: false,
});

export default Admin;