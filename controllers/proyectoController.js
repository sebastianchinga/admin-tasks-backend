import Proyecto from "../models/Proyecto.js";

export const listar = async (req, res) => {
    const { usuario } = req;

    try {
        const proyectos = await Proyecto.findAll({ where: { usuarios_id: usuario.id }, order: [['id', 'DESC']] });
        res.json(proyectos);
    } catch (error) {
        res.status(400).json({ msg: error });
    }

}

export const crear = async (req, res) => {
    const { usuario } = req;
    const { slug } = req.body;
    const findSlug = await Proyecto.findOne({ where: { slug } });
    if (findSlug) {
        const error = new Error('El slug de esta tarea ya existe');
        return res.status(400).json({ msg: error.message });
    }

    const proyecto = new Proyecto(req.body);
    proyecto.usuarios_id = usuario.id;

    try {
        const proyectoSaved = await proyecto.save();
        res.json(proyectoSaved);
    } catch (error) {
        res.status(400).json({ msg: error });
    }

}

export const editar = async (req, res) => {
    const { id } = req.params;
    const { titulo, slug, descripcion } = req.body;
    const { usuario } = req;
    const proyecto = await Proyecto.findOne({ where: { id } });

    if (proyecto.usuarios_id !== usuario.id) {
        const error = new Error('No tienes acceso a esta tarea');
        return res.status(400).json({ msg: error.message });
    }

    if (!proyecto) {
        const error = new Error('Esta tarea no existe');
        return res.status(400).json({ msg: error.message });
    }

    proyecto.titulo = titulo || proyecto.titulo;
    proyecto.slug = slug || proyecto.slug;
    proyecto.descripcion = descripcion || proyecto.descripcion;

    try {
        const proyectoEditado = await proyecto.save();
        res.json(proyectoEditado);
    } catch (error) {
        res.status(400).json({ msg: 'No se pudo actualizar el registro' });
    }
}

export const eliminar = async (req, res) => {
    const { id } = req.params;
    const { usuario } = req;
    const proyecto = await Proyecto.findOne({ where: { id } });

    if (!proyecto) {
        const error = new Error('Esta tarea no existe');
        return res.status(400).json({ msg: error.message });
    }

    if (proyecto.usuarios_id !== usuario.id) {
        const error = new Error('No tienes acceso a esta tarea');
        return res.status(400).json({ msg: error.message });
    }

    try {
        await proyecto.destroy();
        res.json({ msg: 'Tarea eliminada' })
    } catch (error) {
        res.status(400).json({ msg: error })
    }


}