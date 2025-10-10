import { Router } from "express";
import {
    crearRecetas,
    listarReceta,
    consultarRecetas,
    editarReceta,
    eliminarRecetas,
    recetaUserEspecifico
} from "../controllers/gestionRecestas.controllers.js";

import{
    registrarUsuario,
    obtenerTodosLosUsuarios,
    obtenerUnUsuario,
    actualizarUnUsuario,
    eliminarUnUsuario
} from "../controllers/usuarios.controllers.js";

import{
    agregarIngredientes,
    verIngredientes,
    eliminarIngredientes,
    buscarRecetasPorIngredienteController
} from "../controllers/ingredientes.controllers.js"

import { crearRecetaDTO, editarTituloRecetaDTO } from "../dtos/recetas.dto.js";
import { crearUsuarioDTO,actualizarUsuarioDTO,eliminarUsuarioDTO } from "../dtos/usuarios.dto.js";
import { agregarIngredientesDTO,eliminarIngredientesDTO,buscarRecetasPorIngredienteDTO } from "../dtos/ingredientes.dto.js";
import { validationDTO } from "../middlewares/validationDTO.js";

const router = Router();
//recetas
router.post("/",crearRecetaDTO,validationDTO,crearRecetas);
router.get("/listar",listarReceta);
router.get("/consultar/:id",consultarRecetas);
router.patch("/:id",editarTituloRecetaDTO,validationDTO,editarReceta);
router.delete("/:id",eliminarRecetas);
router.get("/usuario",recetaUserEspecifico);

//usuarios
router.post("/",crearUsuarioDTO,validationDTO,registrarUsuario);
router.get("/",obtenerTodosLosUsuarios);
router.get("/:id",obtenerUnUsuario);
router.patch("/:id",actualizarUsuarioDTO,validationDTO,actualizarUnUsuario);
router.delete("/:id",eliminarUsuarioDTO,validationDTO,eliminarUnUsuario);

//ingredientes
router.post("/",agregarIngredientesDTO,validationDTO,agregarIngredientes);
router.get("/",verIngredientes);
router.delete("/:id",eliminarIngredientesDTO,validationDTO,eliminarIngredientes);
router.get("/:id",buscarRecetasPorIngredienteDTO,validationDTO,buscarRecetasPorIngredienteController)


export default router;