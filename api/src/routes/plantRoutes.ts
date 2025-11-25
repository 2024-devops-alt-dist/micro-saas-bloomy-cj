import { Router } from "express";
import { plantController } from "../controllers/plantController";
import authMiddleware from "../middlewares/auth";
import isAdmin from "../middlewares/isAdmin";
export const router = Router();

/**
 * @swagger
 * /plants:
 *   get:
 *     summary: Récupère la liste des plantes
 *     tags:
 *       - Plants
 *     responses:
 *       200:
 *         description: Liste des plantes
 */
router.get("/plants", plantController.getAll);

/**
 * @swagger
 * /plants/{id}:
 *   get:
 *     summary: Récupère une plante par son ID
 *     tags:
 *       - Plants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la plante
 *     responses:
 *       200:
 *         description: Plante trouvée
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Plante introuvable
 *       500:
 *         description: Erreur serveur
 */
router.get("/plants/:id", plantController.getById);

/**
 * @swagger
 * /plants:
 *   post:
 *     summary: Crée une nouvelle plante
 *     tags:
 *       - Plants
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 type: string
 *               parent_slug:
 *                 type: string
 *                 nullable: true
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               space_between:
 *                 type: string
 *               temperature:
 *                 type: string
 *               id_difficulty:
 *                 type: integer
 *               id_exposition:
 *                 type: integer
 *               id_watering:
 *                 type: integer
 *               id_picture_plant:
 *                 type: integer
 *               id_localisation:
 *                 type: integer
 *               categories:
 *                 type: array
 *                 items:
 *                   type: integer
 *               tags:
 *                 type: array
 *                 items:
 *                   type: integer
 *               sowingDates:
 *                 type: array
 *                 items:
 *                   type: integer
 *               harvestDates:
 *                 type: array
 *                 items:
 *                   type: integer
 *               plantDates:
 *                 type: array
 *                 items:
 *                   type: integer
 *               toxicPets:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     petId:
 *                       type: integer
 *                     niveauToxicite:
 *                       type: string
 *                       enum: [Faible, Modéré, Élevé]
 *     responses:
 *       201:
 *         description: Plante créée avec succès
 *       400:
 *         description: Slug déjà existant ou données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/plants", authMiddleware, isAdmin, plantController.create);

/**
 * @swagger
 * /plants/{id}:
 *   delete:
 *     summary: Supprime une plante par son ID
 *     tags:
 *       - Plants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la plante à supprimer
 *     responses:
 *       200:
 *         description: Plante supprimée avec succès
 *       404:
 *         description: Plante introuvable
 *       400:
 *         description: ID invalide
 *       500:
 *         description: Erreur serveur
 */
router.delete("/plants/:id", authMiddleware, isAdmin, plantController.delete);

/**
 * @swagger
 * /plants/{id}:
 *   put:
 *     summary: Met à jour une plante existante
 *     tags:
 *       - Plants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la plante à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slug:
 *                 type: string
 *               parent_slug:
 *                 type: string
 *                 nullable: true
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               space_between:
 *                 type: string
 *               temperature:
 *                 type: string
 *               id_difficulty:
 *                 type: integer
 *               id_exposition:
 *                 type: integer
 *               id_watering:
 *                 type: integer
 *               id_picture_plant:
 *                 type: integer
 *               id_localisation:
 *                 type: integer
 *               categories:
 *                 type: array
 *                 items:
 *                   type: integer
 *               tags:
 *                 type: array
 *                 items:
 *                   type: integer
 *               sowingDates:
 *                 type: array
 *                 items:
 *                   type: integer
 *               harvestDates:
 *                 type: array
 *                 items:
 *                   type: integer
 *               plantDates:
 *                 type: array
 *                 items:
 *                   type: integer
 *               toxicPets:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     petId:
 *                       type: integer
 *                     niveauToxicite:
 *                       type: string
 *                       enum: [Faible, Modéré, Élevé]
 *     responses:
 *       200:
 *         description: Plante mise à jour avec succès
 *       400:
 *         description: Slug déjà utilisé ou données invalides
 *       404:
 *         description: Plante non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.put("/plants/:id", authMiddleware, isAdmin, plantController.update);
