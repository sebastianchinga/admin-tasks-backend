import express from 'express';
import { actualizarPerfil, cambiarPassword, confirmar, login, olvidePassword, perfil, registrar, validarToken } from '../controllers/usuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', login);
router.post('/registrar', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(validarToken).put(cambiarPassword);

router.get('/perfil', authMiddleware, perfil);
router.put('/actualizar-perfil', authMiddleware, actualizarPerfil);

export default router;