import enviarConfirmacion from "../helpers/enviarConfirmacion.js";
import generarJWT from "../helpers/generarJWT.js";
import generarToken from "../helpers/generarToken.js";
import recuperarCuenta from "../helpers/recuperarCuenta.js";
import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
        const error = new Error('Este usuario no existe');
        return res.status(400).json({ msg: error.message })
    }

    if (!usuario.confirmado) {
        const error = new Error('Confirma tu cuenta');
        return res.status(400).json({ msg: error.message })
    }

    if (await usuario.validarPassword(password)) {
        res.json({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id)
        })
    } else {
        res.status(400).json({ msg: 'Password incorrecto' })
    }

}

export const registrar = async (req, res) => {
    const { email } = req.body;
    const usuarioFound = await Usuario.findOne({ where: { email } });

    if (usuarioFound) {
        const error = new Error('Este usuario ya se registró');
        return res.status(400).json({ msg: error.message })
    }

    const usuario = new Usuario(req.body);
    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(usuario.password, salt);

    try {
        await enviarConfirmacion(usuario);
        await usuario.save();
        res.json({ msg: 'Revisa tu e-mail para confirmar tu cuenta' })
    } catch (error) {
        res.status(400).json({ msg: error });
    }

}

export const confirmar = async (req, res) => {
    const { token } = req.params;
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        const error = new Error('Este token es inválido');
        return res.status(400).json({ msg: error.message })
    }

    // usuario.confirmado = true;
    // usuario.token = null;

    try {
        // Actualizando usuario
        await usuario.update({ token: null, confirmado: true });
        res.json({ msg: 'Usuario confirmado' });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const perfil = (req, res) => {
    const { usuario } = req;
    res.json({
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
    })
}

export const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
        const error = new Error('Este usuario no existe');
        return res.status(400).json({ msg: error.message })
    }

    if (!usuario.confirmado) {
        const error = new Error('Confirma tu cuenta para cambiar el password');
        return res.status(400).json({ msg: error.message })
    }


    usuario.token = generarToken();
    try {
        await recuperarCuenta(usuario);
        await usuario.save();
        res.json({ msg: 'Te hemos enviado instrucciones a tu e-mail' })
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const validarToken = async (req, res) => {
    const { token } = req.params;
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        const error = new Error('Este token no existe');
        return res.status(400).json({ msg: error.message });
    }

    res.json(usuario);
}

export const cambiarPassword = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
    const usuario = await Usuario.findOne({ where: { token } });

    if (!usuario) {
        const error = new Error('Este token no existe');
        return res.status(400).json({ msg: error.message });
    }

    const salt = await bcrypt.genSalt(10);
    usuario.password = await bcrypt.hash(password, salt);
    usuario.token = null;

    try {
        await usuario.save();
        res.json({ msg: 'Password modificado' })
    } catch (error) {
        res.status(400).json({ msg: error })
    }

}

export const actualizarPerfil = async (req, res) => {
    const { nombre, email } = req.body
    const { usuario } = req;
    const user = await Usuario.findOne({where: {id: usuario.id}});
    user.nombre = nombre || user.nombre;
    user.email = email || user.email;
    
    try {
        const usuarioGuardado = await user.save();
        res.json(usuarioGuardado);
    } catch (error) {
        res.status(400).json({msg: 'Hubo un error'});
    }
}