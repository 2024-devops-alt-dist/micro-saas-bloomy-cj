import { Router } from "express";
import { usersController } from "../controllers/usersController";
export const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 *       500:
 *         description: Erreur serveur
 */
router.get("/users", usersController.getAll);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur introuvable
 */
router.get("/users/:id", usersController.getById);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               firstname:
 *                 type: string
 *                 minLength: 2
 *               lastname:
 *                 type: string
 *                 minLength: 2
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *               picture_profil:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *                 default: user
 *     responses:
 *       201:
 *         description: Utilisateur créé avec succès
 *       400:
 *         description: Données invalides (erreur de validation ou email déjà utilisé)
 *       500:
 *         description: Erreur serveur
 */
router.post("/users", usersController.create);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur par son ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur à supprimer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Utilisateur introuvable
 *       500:
 *         description: Erreur serveur
 */
router.delete("/users/:id", usersController.delete);

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Met à jour un utilisateur par son ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de l'utilisateur à mettre à jour
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstname:
 *                type: string
 *              lastname:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *              picture_profil:
 *                type: string
 *              role:
 *                type: string
 *                enum: [user, admin]
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour avec succès
 *       400:
 *         description: Données invalides (validation ou email déjà utilisé)
 *       404:
 *         description: Utilisateur introuvable
 *       500:
 *         description: Erreur serveur
 */
router.patch("/users/:id", usersController.update);

