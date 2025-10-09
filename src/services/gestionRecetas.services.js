import {obtenerDB} from "../config/db.js";

const COLECCION_RECETA = "recetas"
const COLECCION_INGREDIENTES = "ingredientes";
const COLECCION_USUARIO = "usuarios";

export async function crearReceta(datos) {
    const {id, titulo,descripcion,ingredientes = []} = datos;
    if(!id || !titulo || !descripcion || ingredientes.length===0){
        throw new Error("Falta algún campo");
    }
    
    const ingredientesExistentes = await obtenerDB().collection(COLECCION_INGREDIENTES).find({nombre:{$in:ingredientes}}).toArray();
    const ingredientesEcontrados = ingredientesExistentes.map(i=>i.nombre);
    const ingredientesFaltantes = ingredientes.filter(i=> !ingredientesEcontrados.includes(i));

    if(ingredientesFaltantes.length > 0) throw new Error(`No existen los ingredientes: ${ingredientesFaltantes}`);

    const receta = {
        id,
        titulo,
        descripcion,
        ingredientes
    }
    
    await obtenerDB().collection(COLECCION_RECETA).insertOne(receta);
    return {message : "Nueva receta creada"};
}

export async function listarRecetas() {
    const recetas = await obtenerDB().collection(COLECCION_RECETA).find().toArray();
    return recetas;
}

export async function consultarReceta(id) {
    const receta = await obtenerDB().collection(COLECCION_RECETA).findOne({id});

    if(!receta) throw new Error("Receta no encontrada");
    
    const ingredientes = await obtenerDB().collection(COLECCION_INGREDIENTES).find({nombre:{$in:receta.ingredientes}}).toArray();
    return ingredientes;
}

export async function editarTituloReceta(id,titulo) {
    const resultado = await obtenerDB().collection(COLECCION_RECETA).updateOne({id},{$set:{titulo}});
    if (resultado.matchedCount === 0) throw new Error("Receta no encontrada");
    return {message:"Titulo de la receta modificado"};
}

export async function eliminarReceta(id) {
    const resultado = await obtenerDB().collection(COLECCION_RECETA).deleteOne({id});
    if (resultado.deletedCount === 0) throw new Error("Receta no encontrada");
    return{message:"Receta eliminada"}
}

export async function recetasUsuarioEspecifico(nombreUsuario) {
    const usuario = await obtenerDB().collection(COLECCION_USUARIO).find({nombre:nombreUsuario});

    if(!usuario) throw new Error("Usuario no encontrado");
    const recetas = await obtenerDB().collection(COLECCION_RECETA).find({usuario:nombreUsuario}).toArray();

    if(recetas.length === 0) throw new Error("No hay recetas registradas");
    return recetas;
}  