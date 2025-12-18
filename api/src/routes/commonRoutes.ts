import { Router } from "express";
import { commonController } from "../controllers/commonController";

export const router = Router();

/**
 * @swagger
 * /localisations:
 *   get:
 *     summary: Récupère toutes les localisations
 *     tags:
 *       - Common
 *     responses:
 *       200:
 *         description: Succès
 */
router.get("/localisations", commonController.getAllLocalisation);

/**
 * @swagger
 * /expositions:
 *   get:
 *     summary: Récupère toutes les expositions
 *     tags:
 *       - Common
 *     responses:
 *       200:
 *         description: Succès
 */
router.get("/expositions", commonController.getAllExpositions);

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Récupère tous les pets
 *     tags:
 *       - Common
 *     responses:
 *       200:
 *         description: Succès
 */
router.get("/pets", commonController.getAllPets);
