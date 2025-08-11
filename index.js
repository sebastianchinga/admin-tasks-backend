import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import proyectoRoutes from './routes/proyectoRoutes.js';
import usuarioRouter from './routes/usuarioRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js';
import db from './config/db.js';
import Tarea from './models/Tarea.js';
import Usuario from './models/Usuario.js';
import Proyecto from './models/Proyecto.js';
import "./models/asociaciones.js";

const app = express();

dotenv.config();

db.authenticate().then(() => console.log('Base de datos conectada')).catch(e => console.log(e))
db.sync().then(() => console.log('Tablas creadas')).catch(e => console.log(e));

app.use(express.json());

const dominiosPermitidos = [process.env.URL_FRONTEND];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || dominiosPermitidos.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.use('/api/usuarios', usuarioRouter);
app.use('/api/tareas', tareaRoutes);
app.use('/api/proyectos', proyectoRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Corriendo app en el puerto ${PORT}`);
})