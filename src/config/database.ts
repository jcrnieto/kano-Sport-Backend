import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL
if (connectionString) {
  console.log('🌐 Usando base de datos en la nube (Render)');
} else {
  console.log('💻 Usando base de datos local');
}

const sequelize = connectionString
  ? new Sequelize(connectionString, {
      dialect: 'postgres',
      dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME_LOCAL as string,
      process.env.DB_USER_LOCAL as string,
      process.env.DB_PASSWORD_LOCAL as string,
      {
        host: process.env.DB_HOST_LOCAL,
        port: parseInt(process.env.DB_PORT_LOCAL || '5432'),
        dialect: 'postgres',
        logging: false,
      }
    )

export default sequelize;
