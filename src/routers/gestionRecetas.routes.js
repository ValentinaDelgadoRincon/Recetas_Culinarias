import { Router } from "express";
import {
    crearRecetas,
    listarReceta,
    consultarRecetas,
    editarReceta,
    eliminarRecetas,
    recetaUserEspecifico
} from "../controllers/gestionRecestas.controllers.js";

import { crearRecetaDTO, editarTituloRecetaDTO } from "../dtos/recetas.dto.js";
import { validationDTO } from "../middlewares/validationDTO.js";

const router = Router();

router.post("/",crearRecetaDTO,validationDTO,crearRecetas);
router.get("/listar",listarReceta);
router.get("/consultar",consultarRecetas);
router.patch("/:id",editarTituloRecetaDTO,validationDTO,editarReceta);
router.delete("/:id",eliminarRecetas);
router.get("/usuario",recetaUserEspecifico);

export default router;