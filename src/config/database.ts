import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME_PROD as string,
  process.env.DB_USER_PRO as string,
  process.env.DB_PASSWORD_PROD,
  {
    host: process.env.DB_HOST_PROD,
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT_PROD || '5432'),
    logging: false,
  }
);

export default sequelize;

