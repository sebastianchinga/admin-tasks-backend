import Usuario from "./Usuario.js";
import Proyecto from "./Proyecto.js";
import Tarea from "./Tarea.js";

// Relacion Usuario-Proyecto (1:n)
Usuario.hasMany(Proyecto, {
    foreignKey: 'usuarios_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Proyecto.belongsTo(Usuario, {
    foreignKey: 'usuarios_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Relación Usuario-Tarea (1:n)
Usuario.hasMany(Tarea, {
    foreignKey: 'usuarios_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Tarea.belongsTo(Usuario, {
    foreignKey: 'usuarios_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Relación Proyecto-Tarea
Proyecto.hasMany(Tarea, {
    foreignKey: 'proyectos_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
Tarea.belongsTo(Proyecto, {
    foreignKey: 'usuarios_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});