import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generarJWT = (id) => {
    return jwt.sign({id}, process.env.PALABRA_SECRETA, {
        expiresIn: '30d'
    })
}

export default generarJWT