import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import sequelize from './config/database';

import Student from './models/Student';
import Quota from './models/Quota'; 

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('✅ El archivo server.ts se está ejecutando');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', routes);

const startServer = async () => {
  try {
    
    await sequelize.authenticate();
    console.log('📡 Conexión a la base de datos exitosa');

    // Sincronizar modelos (crea las tablas)
    await sequelize.sync({ alter: true }); // Usa alter: true en desarrollo
    console.log('🧱 Tablas sincronizadas correctamente');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor o conectar la base de datos:', error);
  }
};

startServer();
