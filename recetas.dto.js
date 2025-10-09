import { body, param } from "express-validator";

export const crearRecetaDTO = [
    body("id").isInt({ min: 1 }).withMessage("El id debe ser un entero positivo"),
    body("titulo").isString().trim().notEmpty().withMessage("EL titulo de la receta es obligatorio"),
    body("descripcion").isString().trim().notEmpty().withMessage("La descipción de la receta es obligatoria"),
    body("ingredientes").isArray({ min: 1 }).withMessage("Debe tener al menos un ingrediente y deben ser texto válido"),
    body("ingredientes.*").isString().trim().notEmpty().withMessage("Los ingredientes deben ser texto ")
];

export const editarTituloRecetaDTO = [
    body("id").isInt({ min: 1 }).withMessage("El id debe ser un entero positivo"),
    body("titulo").isString().trim().notEmpty().withMessage("EL titulo de la receta es obligatorio"),
]