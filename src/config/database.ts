import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME_PROD as string,
//   process.env.DB_USER_PRO as string,
//   process.env.DB_PASSWORD_PROD,
//   {
//     host: process.env.DB_HOST_PROD,
//     dialect: 'postgres',
//     port: parseInt(process.env.DB_PORT_PROD || '5432'),
//     logging: false,
//   }
// );

// export default sequelize;

const connectionString = process.env.DATABASE_URL
const sequelize = connectionString
  ? new Sequelize(connectionString, {
      dialect: 'postgres',
      dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
      logging: false,
    })
  : new Sequelize(
      process.env.DB_NAME_PROD as string,
      process.env.DB_USER_PROD as string,
      process.env.DB_PASSWORD_PROD as string,
      {
        host: process.env.DB_HOST_PROD,
        port: parseInt(process.env.DB_PORT_PROD || '5432'),
        dialect: 'postgres',
        logging: false,
      }
    )

export default sequelize;
