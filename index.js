import express from 'express';
import dotenv from 'dotenv'
import usuarioRouter from './routes/usuarioRoutes.js'
import db from './config/db.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();

dotenv.config();

db.authenticate().then(() => console.log('Base de datos conectada')).catch(e => console.log(e))

app.use(express.json());

app.use('/api/usuarios', usuarioRouter);
app.use('/api/tareas', tareaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Corriendo app en el puerto ${PORT}`);
})