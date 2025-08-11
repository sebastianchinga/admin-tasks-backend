import Usuario from "./Usuario.js";
import Proyecto from "./Proyecto.js";
import Tarea from "./Tarea.js";

// Relacion Usuario-Proyecto (1:n)
Usuario.hasMany(Proyecto, {
    foreignKey: 'usuarios_id'
})
Proyecto.belongsTo(Usuario, {
    foreignKey: 'usuarios_id'
});

// Relación Usuario-Tarea (1:n)
Usuario.hasMany(Tarea, {
    foreignKey: 'usuarios_id'
})
Tarea.belongsTo(Usuario, {
    foreignKey: 'usuarios_id'
});

// Relación Proyecto-Tarea
Proyecto.hasMany(Tarea, {
    foreignKey: 'proyectos_id'
})
Tarea.belongsTo(Proyecto, {
    foreignKey: 'usuarios_id'
});