import Tarea from "../models/Tarea.js";

export const tareas = async (req, res) => {
    const { usuario } = req;
    try {
        const tareas = await Tarea.findAll({ where: { usuarios_id: usuario.id }, order: [['id', 'DESC']] });
        res.json(tareas);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const crear = async (req, res) => {
    const { usuario } = req;
    const tarea = new Tarea(req.body)
    tarea.usuarios_id = usuario.id

    try {
        const tareaGuardada = await tarea.save();
        res.json(tareaGuardada);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const mostrar = async (req, res) => {
    const { id } = req.params;
    const { usuario } = req;

    try {
        const tarea = await Tarea.findOne({ where: { usuarios_id: usuario.id, id } });
        res.json(tarea)
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const editar = async (req, res) => {
    const { titulo, descripcion } = req.body
    const { id } = req.params;
    const { usuario } = req;

    const tarea = await Tarea.findOne({ where: { usuarios_id: usuario.id, id } })
    tarea.titulo = titulo || tarea.titulo;
    tarea.descripcion = descripcion || tarea.descripcion;

    try {
        const tareaActualizada = await tarea.save();
        res.json(tareaActualizada);
    } catch (error) {
        res.status(400).json({ msg: error });
    }
}

export const cambiarEstado = async (req, res) => {
    const { id } = req.params;
    const { usuario } = req;

    const tarea = await Tarea.findOne({ where: { usuarios_id: usuario.id, id } })
    tarea.estado = !tarea.estado;

    try {
        const tareaActualizado = await tarea.save();
        res.json(tareaActualizado);
    } catch (error) {
        res.status(400).json({ msg: error });
    }

}

export const filtrar = async (req, res) => {
    const { estado } = req.params;
    const { usuario } = req;
    const usuarios_id = usuario.id;
    const tareas = await Tarea.findAll({ where: { estado, usuarios_id } });

    if (tareas.length === 0) {
        const error = new Error('No existen tareas');
        return res.status(400).json({ msg: error.message })
    }

    res.json(tareas)
}