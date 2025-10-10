//Agregar ingredientes a una receta existente (cada ingrediente tendrá un nombre y estará vinculado a una receta)
import { agregarIngredientesAReceta, obtenerIngredientesDeReceta, eliminarIngredientesDeReceta, buscarRecetasPorIngrediente } from "../services/ingredientes.services.js";

// Agregar ingredientes a una receta
export async function agregarIngredientes(req, res) {
    try {
        const idReceta = req.params.id;
        const { ingredientes } = req.body;

        const resultado = await agregarIngredientesAReceta(idReceta, ingredientes);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(400).json({ error: "Error al agregar ingrediente" });
    }
} 

// Ver todos los ingredientes de una receta
export async function verIngredientes(req, res) {
    try {
        const idReceta = req.params.id;
        const resultado = await obtenerIngredientesDeReceta(idReceta);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(404).json({ error: "Error al buscar ingredientes de una receta" });
    }
}

// Eliminar ingredientes de una receta

export async function eliminarIngredientes(req, res) {
  try {
    const idReceta = req.params.id;
    const { nombresIngredientes } = req.body;

    if (
      !Array.isArray(nombresIngredientes) ||
      nombresIngredientes.length === 0
    ) {
      return res.status(400).json({
        mensaje:
          "Debes enviar un array con los nombres de los ingredientes a eliminar",
      });
    }

    const resultado = await eliminarIngredientesDeReceta(
      idReceta,
      nombresIngredientes
    );

    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
}


// Buscar todas las recetas que contengan un ingrediente específico (ej. “pollo” muestra todas las recetas que lo usan)
export async function buscarRecetasPorIngredienteController(req, res) {
    try {
        const { nombre } = req.params; 
        const resultado = await buscarRecetasPorIngrediente(nombre);
        res.status(200).json(resultado);
    } catch (error) {
        res.status(404).json({ error: "Error al buscar recetas" });
    }
}
