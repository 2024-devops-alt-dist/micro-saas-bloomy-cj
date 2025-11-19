import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const usersController = {
    getAll: async (_req: Request, res: Response) => {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    picture_profil: true,
                    registration_date: true,
                    role: true,
                },
                // ici je choisis de ne pas renvoyer le mdp pour des raisons de sécurité
            });

            return res.status(200).json(users);

        // V2 du try{} où j'inclu les jardins et les favoris 
        // try {
        //     // Récupération des utilisateurs + relations
        //     const users = await prisma.user.findMany({
        //         include: {
        //             gardens: true,
        //             favoryPlants: {
        //                 include: {
        //                     plant: true,
        //                 },
        //             },
        //         },
        //     });

        //     // Suppression du mot de passe pour chaque user
        //     const sanitizedUsers = users.map((user) => {
        //         const { password, ...safeUser } = user;
        //         return safeUser;
        //     });

        //     return res.status(200).json(sanitizedUsers);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur serveur lors de la récupération des utilisateurs",
                error,
            });
        }
    },

    getById: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await prisma.user.findUnique({
                where: { id: Number(id) },
                include: {
                    gardens: true,
                    favoryPlants: {
                        include: {
                            plant: true
                        }
                    }
                }
            });

            if (!user) {
                return res.status(404).json({ message: `Utilisateur avec l'ID ${id} introuvable` });
            }

            const { password, ...safeUser } = user;
            return res.status(200).json(safeUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: `Erreur serveur lors de la récupération de l'utilisateur ${id}`,
                error,
            });
        }
    },

    create: async (req: Request, res: Response) => {
        const { firstname, lastname, email, password, picture_profil, role } = req.body;

        try {
            // VALIDATIONS/CONTRAINTE DE CREATION
            if (!firstname || firstname.length < 2) {
                return res.status(400).json({
                    message: "Le prénom doit contenir au moins 2 caractères."
                });
            }

            if (!lastname || lastname.length < 2) {
                return res.status(400).json({
                    message: "Le nom doit contenir au moins 2 caractères."
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                return res.status(400).json({
                    message: "Adresse email invalide."
                });
            }

            if (!password || password.length < 8) {
                return res.status(400).json({
                    message: "Le mot de passe doit contenir au moins 8 caractères."
                });
            }

            if (role && !["user", "admin"].includes(role)) {
                return res.status(400).json({
                    message: "Le rôle doit être 'user' ou 'admin'."
                });
            }

            // Vérifier si l'email existe déjà
            const existingUser = await prisma.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                return res.status(400).json({
                    message: `Un utilisateur avec l'email ${email} existe déjà.`
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // INSERTION EN BDD
            const newUser = await prisma.user.create({
                data: {
                    firstname,
                    lastname,
                    email,
                    password: hashedPassword,
                    picture_profil: picture_profil || "default.jpg",
                    role: role || "user"
                },
            });

            // On retire le mot de passe avant retour
            const { password: _, ...safeUser } = newUser;

            return res.status(201).json(safeUser);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur serveur lors de la création du nouvel utilisateur",
                error,
            });
        }
    },

    delete: async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const userId = Number(id);

            if (isNaN(userId)) {
                return res.status(400).json({ message: "ID invalide." });
            }

            const user = await prisma.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                return res.status(404).json({ message: `Utilisateur avec l'ID ${id} introuvable.` });
            }

            await prisma.user.delete({
                where: { id: userId }
            });

            return res.status(200).json({ message: `Utilisateur avec l'ID ${id} supprimé avec succès.` });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur serveur lors de la suppression de l'utilisateur.", error });
        }
    },

    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { firstname, lastname, email, password, picture_profil, role } = req.body;

        try {
            const userId = Number(id);
            if (isNaN(userId)) {
                return res.status(400).json({ message: "ID invalide." });
            }

            const existingUser = await prisma.user.findUnique({ where: { id: userId } });
            if (!existingUser) {
                return res.status(404).json({ message: `Utilisateur avec l'ID ${id} introuvable.` });
            }

            // Validations (seulement pour les champs fournis)
            if (firstname !== undefined && firstname.length < 2) {
                return res.status(400).json({ message: "Le prénom doit contenir au moins 2 caractères." });
            }

            if (lastname !== undefined && lastname.length < 2) {
                return res.status(400).json({ message: "Le nom doit contenir au moins 2 caractères." });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email !== undefined && !emailRegex.test(email)) {
                return res.status(400).json({ message: "Adresse email invalide." });
            }

            if (password !== undefined && password.length < 8) {
                return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères." });
            }

            if (role !== undefined && !["user", "admin"].includes(role)) {
                return res.status(400).json({ message: "Le rôle doit être 'user' ou 'admin'." });
            }

            // Si l'email change, vérifier qu'il n'est pas déjà utilisé
            if (email !== undefined && email !== existingUser.email) {
                const emailTaken = await prisma.user.findUnique({ where: { email } });
                if (emailTaken) {
                    return res.status(400).json({ message: `Un utilisateur avec l'email ${email} existe déjà.` });
                }
            }

            const data: any = {};
            if (firstname !== undefined) data.firstname = firstname;
            if (lastname !== undefined) data.lastname = lastname;
            if (email !== undefined) data.email = email;
            if (picture_profil !== undefined) data.picture_profil = picture_profil;
            if (role !== undefined) data.role = role;
            if (password !== undefined) {
                data.password = await bcrypt.hash(password, 10);
            }

            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data,
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    picture_profil: true,
                    registration_date: true,
                    role: true,
                },
            });

            return res.status(200).json(updatedUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur serveur lors de la mise à jour de l'utilisateur.", error });
        }
    }
};

