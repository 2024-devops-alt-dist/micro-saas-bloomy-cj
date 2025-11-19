import { Router } from "express";
import { gardenController } from "../controllers/gardenController";
export const router = Router();

/**
 * @swagger
 * /gardens:
 *   get:
 *     summary: Récupère la liste de tous les jardins
 *     tags:
 *       - Gardens
 *     responses:
 *       200:
 *         description: Liste des jardins
 *       500:
 *         description: Erreur serveur
 */
router.get("/gardens", gardenController.getAll);

/**
 * @swagger
 * /gardens/{id}:
 *   get:
 *     summary: Récupère un jardin par son ID
 *     tags:
 *       - Gardens
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du jardin
 *     responses:
 *       200:
 *         description: Jardin trouvé
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Jardin introuvable
 *       500:
 *         description: Erreur serveur
 */
router.get("/gardens/:id", gardenController.getById);

/**
 * @swagger
 * /gardens:
 *   post:
 *     summary: Crée un nouveau jardin
 *     tags:
 *       - Gardens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nom du jardin
 *               description:
 *                 type: string
 *               id_user:
 *                 type: integer
 *                 description: ID de l'utilisateur propriétaire
 *               id_localisation:
 *                 type: integer
 *               id_picture_garden:
 *                 type: integer
 *               id_difficulty:
 *                 type: integer
 *               id_exposition:
 *                 type: integer
 *               plants:
 *                 type: array
 *                 items:
 *                   type: integer
 *               pets:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Jardin créé avec succès
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */
router.post("/gardens", gardenController.create);

/**
 * @swagger
 * /gardens/{id}:
 *   put:
 *     summary: Met à jour un jardin par son ID
 *     tags:
 *       - Gardens
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du jardin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               id_localisation:
 *                 type: integer
 *               id_picture_garden:
 *                 type: integer
 *               id_difficulty:
 *                 type: integer
 *               id_exposition:
 *                 type: integer
 *               plants:
 *                 type: array
 *                 items:
 *                   type: integer
 *               pets:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Jardin mis à jour avec succès
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Jardin introuvable
 *       500:
 *         description: Erreur serveur
 */
router.put("/gardens/:id", gardenController.update);

/**
 * @swagger
 * /gardens/{id}:
 *   delete:
 *     summary: Supprime un jardin par son ID
 *     tags:
 *       - Gardens
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du jardin à supprimer
 *     responses:
 *       200:
 *         description: Jardin supprimé avec succès
 *       400:
 *         description: ID invalide ou contraintes empêchent la suppression
 *       404:
 *         description: Jardin introuvable
 *       500:
 *         description: Erreur serveur
 */
router.delete("/gardens/:id", gardenController.delete);
