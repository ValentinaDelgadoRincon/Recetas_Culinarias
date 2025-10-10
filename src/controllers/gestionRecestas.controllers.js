import {
    crearReceta,
    listarRecetas,
    consultarReceta,
    editarTituloReceta,
    eliminarReceta,
    recetasUsuarioEspecifico
} from "../services/gestionRecetas.services.js";

export async function crearRecetas(req, res) {
    try {
        const recetas = await crearReceta(req.body);
        res.status(201).json(recetas);
    } catch (error) {
        res.status(500).json({ error: "Error al crear nueva receta" });
    }
}

export async function listarReceta(req, res) {
    try {
        const recetas = await listarRecetas();
        res.status(200).json(recetas);
    } catch (error) {
        res.status(500).json({ error: "Error al listar recetas" });
    }
}

export async function consultarRecetas(req, res) {
    try {
        const id = req.params.id;
        const receta = await consultarReceta(id);
        if (!receta) return res.status(404).json({ error: "Receta no encontrada" });
        res.status(200).json(receta)
    } catch (error) {
        res.status(500).json({ error: "Error al consultar receta" });
    }
}

export async function editarReceta(req, res) {
    try {
        const id = parseInt(req.params.id);
        const { titulo } = req.body;

        if (!titulo) return res.status(400).json({ error: "Falta Título" })
        const resultado = await editarTituloReceta(id, titulo);
        res.status(202).json(resultado)
    } catch (error) {
        res.status(500).json({ error: "Error al editar titulo de la receta" });
    }
}

export async function eliminarRecetas(req, res) {
    try {
        const id = parseInt(req.params.id);
        const resultado = await eliminarReceta(id);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar receta" });
    }
}

export async function recetaUserEspecifico(req, res) {
 try {
    const {nombreusuario} = req.query;

    if(!nombreusuario) return res.status(400).json({error:"Falta nombre del cliente"});
    const resultado = await recetasUsuarioEspecifico(nombreusuario);
    res.status(202).json(resultado)
 } catch (error) {
    res.status(500).json({error:"Error al consultar las recetas del cliente"})
 }   
}