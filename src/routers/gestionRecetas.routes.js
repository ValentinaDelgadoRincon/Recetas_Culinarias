import { Router } from "express";
import {
    crearRecetas,
    listarReceta,
    consultarRecetas,
    editarReceta,
    eliminarRecetas,
    recetaUserEspecifico
} from "../controllers/gestionRecestas.controllers.js";

import { crearRecetaDTO, editarTituloRecetaDTO } from "../dtos/recetas.dto";
import { validationDTO } from "../middlewares/validationDTO";

const router = Router();

router.post("/",crearRecetaDTO,validationDTO,crearRecetas);
router.get("/",listarReceta);
router.get("/",consultarRecetas);
router.patch("/",editarTituloRecetaDTO,validationDTO,editarReceta);
router.delete("/",eliminarRecetas);
router.get("/",recetaUserEspecifico);

export default router;