import bcrypt from 'bcrypt';
import Admin from '../models/admin';
import sequelize from '../config/database';

(async () => {
  try {
    await sequelize.sync();

    const passwordHash = await bcrypt.hash('admin123', 10);

    await Admin.create({
      username: 'admin',
      password: passwordHash,
    });

    console.log('✅ Admin creado correctamente');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al crear el admin:', error);
    process.exit(1);
  }
})();
