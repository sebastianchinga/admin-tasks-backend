import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Usuario from '../models/Usuario.js';
dotenv.config();

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(" ")[1];
        try {
            const decoded = await jwt.verify(token, process.env.PALABRA_SECRETA);
            req.usuario = await Usuario.findOne({ where: { id: decoded.id } });
            return next();
        } catch (error) {
            return res.status(400).json({ msg: 'Token inválido' })
        }
    }

    if (!token) {
        const error = new Error('Token inexistente');
        return res.status(400).json({msg: error.message})
    }

    next();
}

export default authMiddleware