import { DataTypes, Sequelize } from "sequelize";
import db from "../config/db.js";
import Usuario from "./Usuario.js";

const Tarea = db.define('tareas', {
    titulo: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    usuarios_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
}, {
    timestamps: false
})

export default Tarea