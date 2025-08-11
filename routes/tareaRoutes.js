import express from 'express';
import { cambiarEstado, crear, editar, filtrar, mostrar, tareas } from '../controllers/tareaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/:slug').get(authMiddleware, tareas).post(authMiddleware, crear); // Obtener y crear tarea
router.get('/obtener-tarea/:id', authMiddleware, mostrar); // Mostrar una tarea
router.put('/editar-tarea/:id', authMiddleware, editar); // Editar una tarea
router.put('/cambiar-estado/:id', authMiddleware, cambiarEstado); // Cambiar el estado de una tarea
router.get('/filtrar/:slug/:estado', authMiddleware, filtrar); // Filtrar las tareas por estado

export default router