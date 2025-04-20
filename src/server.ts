import express from 'express';
import routes from './routes';
import morgan from 'morgan';
import sequelize from './config/database'; // Importá tu instancia de Sequelize
import Student from './models/Student'; // Importá al menos un modelo para registrar

const app = express();
const PORT = process.env.PORT || 3000;

console.log('✅ El archivo server.ts se está ejecutando');

app.use(express.json());
app.use(morgan('dev'));
app.use('/api', routes);

// ✅ Envuelve la lógica en una función async
const startServer = async () => {
  try {
    // Paso 1: Conexión a la base de datos
    await sequelize.authenticate();
    console.log('📡 Conexión a la base de datos exitosa');

    // Paso 2: Sincronizar modelos (crea las tablas)
    await sequelize.sync({ alter: true }); // Usa alter: true en desarrollo
    console.log('🧱 Tablas sincronizadas correctamente');

    // Paso 3: Iniciar servidor Express
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor o conectar la base de datos:', error);
  }
};

startServer();
