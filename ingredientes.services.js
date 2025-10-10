import { ObjectId } from "mongodb";
import { obtenerDB } from "../config/db.js";

// Agregar ingredientes a una receta existente
export async function agregarIngredientesAReceta(idReceta, ingredientes) {
  const db = obtenerDB();
  const recetas = db.collection("recetas");

  // Validar ID
  if (!ObjectId.isValid(idReceta)) {
    throw new Error("ID de receta no válido");
  }

  // Verificar que la receta exista
  const receta = await recetas.findOne({ _id: new ObjectId(idReceta) });
  if (!receta) {
    throw new Error("Receta no encontrada");
  }

  // Validar ingredientes
  if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
    throw new Error("Debe enviar una lista de ingredientes");
  }

  // Cada ingrediente debe tener al menos un nombre
  const ingredientesValidos = ingredientes.map((ing) => ({
    _id: new ObjectId(),
    nombre: ing.nombre,
    idReceta: new ObjectId(idReceta),
  }));

  // Actualizar la receta agregando los ingredientes (crea el array si no existe)
  const resultado = await recetas.updateOne(
    { _id: new ObjectId(idReceta) },
    { $push: { ingredientes: { $each: ingredientesValidos } } }
  );

  if (resultado.modifiedCount === 0) {
    throw new Error("No se pudieron agregar los ingredientes");
  }

  return {
    mensaje: "Ingredientes agregados correctamente",
    idReceta,
    ingredientesAgregados: ingredientesValidos,
  };
}

// Ver todos los ingredientes de una receta
export async function obtenerIngredientesDeReceta(idReceta) {
  const db = obtenerDB();
  const recetas = db.collection("recetas");

  // Validar que el ID sea correcto
  if (!ObjectId.isValid(idReceta)) {
    throw new Error("ID de receta no válido");
  }

  // Buscar la receta por ID
  const receta = await recetas.findOne(
    { _id: new ObjectId(idReceta) },
    { projection: { ingredientes: 1, titulo: 1, _id: 1 } }
  );

  if (!receta) {
    throw new Error("Receta no encontrada");
  }

  // Retornar los ingredientes
  return {
    idReceta: receta._id,
    titulo: receta.titulo || "Sin título",
    ingredientes: receta.ingredientes || [],
  };
}

// Eliminar ingredientes de una receta
export async function eliminarIngredientesDeReceta(idReceta, ingredientes) {
  const db = obtenerDB();
  const recetas = db.collection("recetas");

  // Validar ID de receta
  if (!ObjectId.isValid(idReceta)) {
    throw new Error("ID de receta no válido");
  }

  // Validar payload
  if (!Array.isArray(ingredientes) || ingredientes.length === 0) {
    throw new Error("Debe enviar una lista de ingredientes (IDs o nombres)");
  }

  // Verificar que la receta exista
  const receta = await recetas.findOne({ _id: new ObjectId(idReceta) });
  if (!receta) throw new Error("Receta no encontrada");

  // Separar los valores que parecen ObjectId de los que no (nombres)
  const idsValidos = ingredientes
    .filter((i) => ObjectId.isValid(i))
    .map((i) => new ObjectId(i));
  const nombres = ingredientes.filter((i) => !ObjectId.isValid(i));

  // Construir filtro $pull de forma segura según qué se envió
  let pullFilter;
  if (idsValidos.length > 0 && nombres.length > 0) {
    pullFilter = {
      $or: [{ _id: { $in: idsValidos } }, { nombre: { $in: nombres } }],
    };
  } else if (idsValidos.length > 0) {
    pullFilter = { _id: { $in: idsValidos } };
  } else {
    pullFilter = { nombre: { $in: nombres } };
  }

  const resultado = await recetas.updateOne(
    { _id: new ObjectId(idReceta) },
    { $pull: { ingredientes: pullFilter } }
  );

  // Resultado: validaciones y mensajes claros
  if (resultado.matchedCount === 0) {
    throw new Error("Receta no encontrada");
  }

  if (resultado.modifiedCount === 0) {
    // No modificó el documento: significa que no hubo coincidencias con los ids/nombres enviados
    return {
      mensaje:
        "No se eliminaron ingredientes (no se encontraron coincidencias con los IDs/nombres enviados)",
      idReceta,
      revisado: { enviados: ingredientes },
    };
  }

  return {
    mensaje: "Ingredientes eliminados correctamente",
    idReceta,
    ingredientesEliminados: ingredientes,
  };
}
// Buscar recetas por ingrediente
export async function buscarRecetasPorIngrediente(nombreIngrediente) {
  const db = obtenerDB();
  const recetas = db.collection("recetas");

  // Validar que se envíe un nombre de ingrediente
  if (!nombreIngrediente || typeof nombreIngrediente !== "string") {
    throw new Error("Debe proporcionar un nombre de ingrediente válido");
  }

  // Buscar recetas que contengan un ingrediente cuyo nombre coincida (insensible a mayúsculas)
  const resultados = await recetas
    .find({
      "ingredientes.nombre": { $regex: nombreIngrediente, $options: "i" },
    })
    .project({ titulo: 1, descripcion: 1, ingredientes: 1 })
    .toArray();

  if (resultados.length === 0) {
    throw new Error(
      `No se encontraron recetas con el ingrediente "${nombreIngrediente}"`
    );
  }

  return {
    mensaje: `Recetas que contienen "${nombreIngrediente}"`,
    total: resultados.length,
    recetas: resultados,
  };
}
