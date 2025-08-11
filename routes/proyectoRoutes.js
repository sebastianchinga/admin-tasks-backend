import express from 'express';
import { crear, editar, listar } from '../controllers/proyectoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(authMiddleware, listar).post(authMiddleware, crear);
router.put('/editar-proyecto/:id', authMiddleware, editar);

export default router;