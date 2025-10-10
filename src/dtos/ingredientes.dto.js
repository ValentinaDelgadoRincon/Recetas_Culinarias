import { body, param } from "express-validator";

export const agregarIngredientesDTO = [
    body("id").isMongoId().withMessage("El ID de la receta debe ser un ObjectId válido"),
    body("ingredientes").isArray({ min: 1 }).withMessage("Debe enviar un arreglo con al menos un ingrediente"),
    body("ingredientes.*").isString().trim().notEmpty().withMessage("Cada ingrediente debe ser un texto válido"),
];
export const eliminarIngredientesDTO = [
    body("id").isMongoId().withMessage("El ID de la receta debe ser un ObjectId válido"),

    body("idsIngredientes").isArray({ min: 1 }).withMessage("Debe enviar un arreglo con al menos un ID de ingrediente"),

    body("idsIngredientes.*").isMongoId().withMessage("Cada ID de ingrediente debe ser un ObjectId válido"),
];

export const buscarRecetasPorIngredienteDTO = [
    body("nombre").isString().trim().notEmpty().withMessage("Debe especificar el nombre del ingrediente a buscar"),
];
