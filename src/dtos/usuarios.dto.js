import { body, param } from "express-validator";

export const crearUsuarioDTO = [
    body("nombre").isString().trim().notEmpty().withMessage("El nombre es obligatorio"),
    body("email").isEmail().normalizeEmail().withMessage("Debe proporcionar un correo electrónico válido"),
    body("contrasenia").isString().trim().isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];

export const actualizarUsuarioDTO = [
    body("nombre").optional().isString().trim().notEmpty().withMessage("El nombre no puede estar vacío"),
    body("email").optional().isEmail().withMessage("Debe ser un correo electrónico válido"),
    body("contrasenia").optional().isString().isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
];



