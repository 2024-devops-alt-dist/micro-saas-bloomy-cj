import { Router } from "express";
import { commonController } from "../controllers/commonController";

export const router = Router();

/**
 * GET /localisations AJOUTER DOC SWAGGER
 * Retourne la liste des localisations disponibles
 */
router.get("/localisations", commonController.getAllLocalisation);

/** GET /expositions
 * Retourne la liste des expositions disponibles (id, name, description, icon)
 */
router.get("/expositions", commonController.getAllExpositions);
