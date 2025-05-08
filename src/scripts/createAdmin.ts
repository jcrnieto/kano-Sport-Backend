import bcrypt from 'bcrypt';
import Admin from '../models/admin';
import dotenv from 'dotenv';

dotenv.config();

export const ensureAdminExists = async () => {
  const username = process.env.USERNAME;
  const password = process.env.PASSWORD;

  if (!username || !password) {
    throw new Error('❌ USERNAME o PASSWORD no están definidos en las variables de entorno');
  }

  const [admin, created] = await Admin.findOrCreate({
    where: { username },
    defaults: {
      password: await bcrypt.hash(password, 10),
    },
  });

  if (created) {
    console.log('✅ Admin creado automáticamente');
  } else {
    console.log('ℹ️ El admin ya existe');
  }
};