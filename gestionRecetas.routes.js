import { Router } from "express";
import {
    crearRecetas,
    listarReceta,
    consultarRecetas,
    editarReceta,
    eliminarRecetas,
    recetaUserEspecifico
} from "./gestionRecestas.controllers";

import { crearRecetaDTO, editarTituloRecetaDTO } from "./recetas.dto";
import { validationDTO } from "./validationDTO";

const router = Router();

router.post("/",crearRecetaDTO,validationDTO,crearRecetas);
router.get("/",listarReceta);
router.get("/",consultarRecetas);
router.patch("/",editarTituloRecetaDTO,validationDTO,editarReceta);
router.delete("/",eliminarRecetas);
router.get("/",recetaUserEspecifico);

export default router;