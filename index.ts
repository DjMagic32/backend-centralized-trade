import express from 'express';
import mongoose from 'mongoose';
// import cors from 'cors';
import clienteRoutes from './src/routes/client';

const app = express();

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tienda';

// Middleware
app.use(express.json());
// app.use(cors());s

// Rutas
app.use('/clientes', clienteRoutes);

// Conexión a la base de datos
mongoose
  .connect(MONGO_URI
  //   ,{
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
  )
  .then(() => {
    console.log('Conectado a la base de datos');
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
