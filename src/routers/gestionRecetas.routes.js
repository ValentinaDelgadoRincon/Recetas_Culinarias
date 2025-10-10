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
router.post("/recetas",crearRecetaDTO,validationDTO,crearRecetas);
router.get("/recetas/listar",listarReceta);
router.get("/recetas/usuario",recetaUserEspecifico);
router.get("/recetas/:id",consultarRecetas);
router.patch("/recetas/:id",editarTituloRecetaDTO,validationDTO,editarReceta);
router.delete("/recetas/:id",eliminarRecetas);

//usuarios
router.post("/usuarios",crearUsuarioDTO,validationDTO,registrarUsuario);
router.get("/usuarios",obtenerTodosLosUsuarios);
router.get("/usuarios/:id",obtenerUnUsuario);
router.patch("/usuarios/:id",actualizarUsuarioDTO,validationDTO,actualizarUnUsuario);
router.delete("/usuarios/:id",eliminarUsuarioDTO,validationDTO,eliminarUnUsuario);

//ingredientes
router.post("/recetas/:id/ingredientes",agregarIngredientesDTO,validationDTO,agregarIngredientes);
router.get("/recetas/:id/ingredientes",verIngredientes);
router.delete("/recetas/:id/ingredientes",eliminarIngredientesDTO,validationDTO,eliminarIngredientes);
router.get("/ingredientes/:nombre/recetas",buscarRecetasPorIngredienteDTO,validationDTO,buscarRecetasPorIngredienteController)


export default router;