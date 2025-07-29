import express from 'express';
import { cambiarEstado, crear, editar, filtrar, mostrar, tareas } from '../controllers/tareaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(authMiddleware, tareas).post(authMiddleware, crear);
router.route('/:id').get(authMiddleware, mostrar).put(authMiddleware, editar);
router.put('/cambiar-estado/:id', authMiddleware, cambiarEstado);
router.get('/filtrar/:estado', authMiddleware, filtrar);

export default router