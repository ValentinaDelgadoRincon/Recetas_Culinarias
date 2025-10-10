import { obtenerDB } from "../config/db.js";
import { ObjectId } from "mongodb";


const COLECCION_RECETA = "recetas"
const COLECCION_USUARIO = "usuarios";

export async function crearReceta(datos) {
    const { titulo, descripcion, ingredientes = [], idUsuario } = datos;
    if (!titulo || !descripcion) {
        throw new Error("Falta algún campo");
    }
    if( ingredientes.length === 0)
        throw new Error("Debe tener al menos un ingrediente")
    if (idUsuario) {
        if (!ObjectId.isValid(idUsuario)) {
            throw new Error("ID de usuario no válido");
        }
        const usuario = await obtenerDB()
            .collection(COLECCION_USUARIO)
            .findOne({ _id: new ObjectId(idUsuario) });

        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
    }

    const ingredientesFormateados = ingredientes.map(ing => ({
        _id: new ObjectId(),
        nombre: typeof ing === 'string' ? ing : ing.nombre
    }));

    const receta = {
        titulo,
        descripcion,
        ingredientes:ingredientesFormateados,
        idUsuario: idUsuario ? new ObjectId(idUsuario) : null,
        fechaCreacion: new Date()
    }

    await obtenerDB().collection(COLECCION_RECETA).insertOne(receta);
    return { message: "Nueva receta creada" };
}

export async function listarRecetas() {
    const recetas = await obtenerDB().collection(COLECCION_RECETA).find().toArray();
    return recetas;
}

export async function consultarReceta(id) {
    if (!ObjectId.isValid(id)) {
        throw new Error("ID de receta no válido");
    }

    const receta = await obtenerDB().collection(COLECCION_RECETA).findOne({_id: new ObjectId(id)});

    if (!receta) throw new Error("Receta no encontrada");

    return receta
}

export async function editarTituloReceta(id, titulo) {
    const resultado = await obtenerDB().collection(COLECCION_RECETA).updateOne({ _id: new ObjectId(id) }, { $set: { titulo } });
    if (resultado.matchedCount === 0) throw new Error("Receta no encontrada");
    return { message: "Titulo de la receta modificado" };
}

export async function eliminarReceta(id) {
    const resultado = await obtenerDB().collection(COLECCION_RECETA).deleteOne({ _id: new ObjectId(id) });
    if (resultado.deletedCount === 0) throw new Error("Receta no encontrada");
    return { message: "Receta eliminada" }
}

export async function recetasUsuarioEspecifico(nombreUsuario) {
    const usuario = await obtenerDB().collection(COLECCION_USUARIO).findOne({ nombre: nombreUsuario });

    if (!usuario) throw new Error("Usuario no encontrado");
    const recetas = await obtenerDB()
        .collection(COLECCION_RECETA)
        .find({ idUsuario: usuario._id })
        .toArray();
    if (recetas.length === 0) throw new Error("No hay recetas registradas");
    return recetas;
}  