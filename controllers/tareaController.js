import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js";

export const tareas = async (req, res) => {
    // Obtener el slug que recibe como parametro
    const { slug } = req.params;
    // Busco el proyecto por slug
    const proyecto = await Proyecto.findOne({ where: { slug } });
    // Obtener el usuario autenticado
    const { usuario } = req;

    // Si el usuario que creó el proyecto es diferente al usuario autenticado
    if (proyecto.usuarios_id !== usuario.id) {
        // Responde con un mensaje de error
        const error = new Error('No puedes ver las tareas de este proyecto');
        return res.status(400).json({ msg: error.message });
    }

    // En todo caso intenta:
    try {
        // Obtener las tareas donde proyectos_id sea igual al id del proyecto buscado
        const tareas = await Tarea.findAll({ where: { proyectos_id: proyecto.id }, order: [['id', 'DESC']] });
        const completados = tareas.filter(tarea => tarea.estado).length;
        const progreso = (100 * completados) / tareas.length
        res.json({
            tareas,
            total: tareas.length,
            completados,
            progreso: progreso || 0
        });
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const crear = async (req, res) => {
    // Obtener el slug que recibe como parametro
    const { slug } = req.params;
    // Obtener el usuario autenticado
    const { usuario } = req;
    // Buscar el proyecto por el slug (para obtener su id)
    const proyecto = await Proyecto.findOne({ where: { slug } });

    if (proyecto.usuarios_id !== usuario.id) {
        // Responde con un mensaje de error
        const error = new Error('No puedes crear una tarea en este proyecto');
        return res.status(400).json({ msg: error.message });
    }

    // Creamos nueva instancia con la info que el usuario brinda (req.body)
    const tarea = new Tarea(req.body)
    // Llenamos el campo usuarios_id con el usuario autenticado (usuario.id)
    tarea.usuarios_id = usuario.id;
    // Llenamos el campo proyectos_id con el proyecto que se consultó por slug
    tarea.proyectos_id = proyecto.id;

    try {
        // Guardamos la instancia (tarea)
        const tareaGuardada = await tarea.save();
        // Retornamos el resultado guardado
        res.json(tareaGuardada);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const mostrar = async (req, res) => {
    // Obtenemos el id de la tarea
    const { id } = req.params;
    // Obtenemos el usuario autenticado
    const { usuario } = req;

    try {
        // Obtenemos una tarea por id
        const tarea = await Tarea.findOne({ where: { id } });

        if (!tarea) {
            // Responde con un mensaje de error
            const error = new Error('Esta tarea no existe');
            return res.status(400).json({ msg: error.message });
        }

        if (tarea.usuarios_id !== usuario.id) {
            // Responde con un mensaje de error
            const error = new Error('No tienes acceso a esta tarea');
            return res.status(400).json({ msg: error.message });
        }

        res.json(tarea)
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const editar = async (req, res) => {
    // Datos que envía el usuario
    const { titulo, descripcion } = req.body
    // Recibimos el id de la tarea que viene por parámetro
    const { id } = req.params;
    // Obtenemos el usuario autenticado
    const { usuario } = req;

    // Obtenemos la tarea por id
    const tarea = await Tarea.findOne({ where: { id } })
    if (tarea.usuarios_id !== usuario.id) {
        // Responde con un mensaje de error
        const error = new Error('No tienes acceso a esta tarea');
        return res.status(400).json({ msg: error.message });
    }

    // Modificamos los valores
    tarea.titulo = titulo || tarea.titulo;
    tarea.descripcion = descripcion || tarea.descripcion;

    try {
        // Guardamos los cambios
        const tareaActualizada = await tarea.save();
        // Retornamos el objeto modificado
        res.json(tareaActualizada);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const cambiarEstado = async (req, res) => {
    // Recibimos el id de la tarea
    const { id } = req.params;
    // Recibimos el usuario autenticado
    const { usuario } = req;

    const tarea = await Tarea.findOne({ where: { id } })

    if (tarea.usuarios_id !== usuario.id) {
        // Responde con un mensaje de error
        const error = new Error('No tienes acceso a esta tarea');
        return res.status(400).json({ msg: error.message });
    }

    tarea.estado = !tarea.estado;

    try {
        const tareaActualizado = await tarea.save();
        res.json(tareaActualizado);
    } catch (error) {
        res.status(400).json({ msg: error });
    }

}

export const filtrar = async (req, res) => {
    // Recibir el estado por parámetro
    const { estado, slug } = req.params;
    // Recibir usuario autenticado
    const { usuario } = req;
    // Recuperamos el proyecto por slug
    const proyecto = await Proyecto.findOne({ where: { slug } })
    // Buscar las tareas que tenga el valor de estado y que sean las mismas del proyecto
    const tareas = await Tarea.findAll({ where: { estado, proyectos_id: proyecto.id } });

    if (tareas.length === 0) {
        const error = new Error('No existen tareas');
        return res.status(400).json({ msg: error.message })
    }

    res.json(tareas)
}