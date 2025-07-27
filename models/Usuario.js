import { DataTypes } from "sequelize";
import bcrypt from 'bcrypt';
import db from "../config/db.js";
import generarToken from "../helpers/generarToken.js";

const Usuario = db.define('usuarios', {
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: generarToken
    },
    confirmado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: false
})

Usuario.prototype.validarPassword = async function (passForm) {
    return await bcrypt.compare(passForm, this.password);
}

export default Usuario