import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
import db from "../config/db.js";
import generarToken from "../helpers/generarToken.js";

const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING(45)
    },
    email: {
        type: DataTypes.STRING(45),
        unique: true
    },
    password: {
        type: DataTypes.STRING(60)
    },
    token: {
        type: DataTypes.STRING(45),
        defaultValue: generarToken
    },
    confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
})

Usuario.prototype.validarPassword = async function (passForm) {
    return await bcrypt.compare(passForm, this.password);
}

export default Usuario