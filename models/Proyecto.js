import { DataTypes } from "sequelize";
import db from "../config/db.js";
import Usuario from "./Usuario.js";

const Proyecto = db.define('proyectos', {
    titulo: {
        type: DataTypes.STRING(45)
    },
    slug: {
        type: DataTypes.STRING(150),
        unique: true
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    usuarios_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
}, {
    timestamps: true
})

export default Proyecto