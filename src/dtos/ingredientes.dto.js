import { body, param } from "express-validator";

export const agregarIngredientesDTO = [
    body("ingredientes").isArray({ min: 1 }).withMessage("Debe enviar un arreglo con al menos un ingrediente"),
    body("ingredientes.*").isString().trim().notEmpty().withMessage("Cada ingrediente debe ser un texto válido"),
];


