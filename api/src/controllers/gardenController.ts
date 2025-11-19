import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

export const gardenController = {
    getAll: async (_req: Request, res: Response) => {
        try {
            const gardens = await prisma.garden.findMany({
                include: {
                    // exclure le mdp des données user remontées
                    user: {
                        select: {
                            id: true,
                            lastname: true,
                            firstname: true,
                            email: true,
                            picture_profil: true,
                            registration_date: true,
                            role: true
                        }
                    },
                    localisation: true,
                    pictureGarden: true,
                    difficulty: true,
                    exposition: true,
                    pets: {
                        include: {
                            pet: true
                        }
                    },
                    plants: {
                        include: {
                            plant: {
                                include: {
                                    difficulty: true,
                                    exposition: true,
                                    localisation: true,
                                    watering: true,
                                    picturePlant: true,
                                    categories: { include: { category: true } },
                                    tags: { include: { tag: true } },
                                    sowingDates: { include: { sowingDate: true } },
                                    harvestDates: { include: { harvestDate: true } },
                                    plantDates: { include: { plantDate: true } },
                                    toxicPets: true
                                }
                            }
                        }
                    }
                }
            });

            return res.status(200).json(gardens);
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur serveur lors de la récupération des jardins.",
                error
            });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);

            if (isNaN(id)) {
                return res.status(400).json({ message: "ID invalide." });
            }

            const garden = await prisma.garden.findUnique({
                where: { id },
                include: {
                    user: {
                        select: {
                            id: true,
                            lastname: true,
                            firstname: true,
                            email: true,
                            picture_profil: true,
                            registration_date: true,
                            role: true
                        }
                    },
                    localisation: true,
                    pictureGarden: true,
                    difficulty: true,
                    exposition: true,
                    pets: {
                        include: {
                            pet: true
                        }
                    },
                    plants: {
                        include: {
                            plant: {
                                include: {
                                    difficulty: true,
                                    exposition: true,
                                    localisation: true,
                                    watering: true,
                                    picturePlant: true,
                                    categories: { include: { category: true } },
                                    tags: { include: { tag: true } },
                                    sowingDates: { include: { sowingDate: true } },
                                    harvestDates: { include: { harvestDate: true } },
                                    plantDates: { include: { plantDate: true } },
                                    toxicPets: true
                                }
                            }
                        }
                    }
                }
            });

            if (!garden) {
                return res.status(404).json({ message: "Jardin introuvable." });
            }

            return res.status(200).json(garden);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur serveur lors de la récupération du jardin.",
                error
            });
        }
    },

    create: async (req: Request, res: Response) => {
        try {
            const { name, description, id_user, id_localisation, id_picture_garden, id_difficulty, id_exposition, plants, pets } = req.body;

            if (!name || !id_user) {
                return res.status(400).json({ message: "Le nom et l'ID utilisateur sont obligatoires." });
            }

            // Création du jardin
            const garden = await prisma.garden.create({
                data: {
                    name,
                    description,
                    id_user,
                    id_localisation,
                    id_picture_garden,
                    id_difficulty,
                    id_exposition
                }
            });

            const gardenId = garden.id;

            // Relations Many-to-Many 
            if (Array.isArray(plants)) {
                await prisma.gardenHasPlant.createMany({
                    data: plants.map((plantId: number) => ({
                        gardenId,
                        plantId
                    })),
                    skipDuplicates: true
                });
            }

            if (Array.isArray(pets)) {
                await prisma.gardenHasPet.createMany({
                    data: pets.map((petId: number) => ({
                        gardenId,
                        petId
                    })),
                    skipDuplicates: true
                });
            }

            // Re-fetch complet avec relations
            const createdGarden = await prisma.garden.findUnique({
                where: { id: gardenId },
                include: {
                    user: {
                        select: {
                            id: true,
                            lastname: true,
                            firstname: true,
                            email: true,
                            picture_profil: true,
                            registration_date: true,
                            role: true
                        }
                    },
                    localisation: true,
                    pictureGarden: true,
                    difficulty: true,
                    exposition: true,
                    pets: { include: { pet: true } },
                    plants: {
                        include: {
                            plant: {
                                include: {
                                    difficulty: true,
                                    exposition: true,
                                    localisation: true,
                                    watering: true,
                                    picturePlant: true,
                                    categories: { include: { category: true } },
                                    tags: { include: { tag: true } },
                                    sowingDates: { include: { sowingDate: true } },
                                    harvestDates: { include: { harvestDate: true } },
                                    plantDates: { include: { plantDate: true } },
                                    toxicPets: true
                                }
                            }
                        }
                    }
                }
            });

            return res.status(201).json(createdGarden);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur serveur lors de la création du jardin.",
                error
            });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID invalide." });
            }

            const { name, description, id_localisation, id_picture_garden, id_difficulty, id_exposition, plants, pets } = req.body;

            // Vérifier que le jardin existe
            const existingGarden = await prisma.garden.findUnique({ where: { id } });
            if (!existingGarden) {
                return res.status(404).json({ message: "Jardin introuvable." });
            }

            // Préparer les champs à update
            const data: any = {};
            if (name !== undefined) data.name = name;
            if (description !== undefined) data.description = description;
            if (id_localisation !== undefined) data.id_localisation = id_localisation;
            if (id_picture_garden !== undefined) data.id_picture_garden = id_picture_garden;
            if (id_difficulty !== undefined) data.id_difficulty = id_difficulty;
            if (id_exposition !== undefined) data.id_exposition = id_exposition;

            await prisma.garden.update({
                where: { id },
                data
            });

            // Relations Many-to-Many
            if (Array.isArray(plants)) {
                // Supprimer existants
                await prisma.gardenHasPlant.deleteMany({ where: { gardenId: id } });
                // Ajouter les nouveaux
                await prisma.gardenHasPlant.createMany({
                    data: plants.map((plantId: number) => ({
                        gardenId: id,
                        plantId
                    })),
                    skipDuplicates: true
                });
            }

            if (Array.isArray(pets)) {
                await prisma.gardenHasPet.deleteMany({ where: { gardenId: id } });
                await prisma.gardenHasPet.createMany({
                    data: pets.map((petId: number) => ({
                        gardenId: id,
                        petId
                    })),
                    skipDuplicates: true
                });
            }

            // Re-fetch complet avec relations
            const updatedGarden = await prisma.garden.findUnique({
                where: { id },
                include: {
                    user: {
                        select: {
                            id: true,
                            lastname: true,
                            firstname: true,
                            email: true,
                            picture_profil: true,
                            registration_date: true,
                            role: true
                        }
                    },
                    localisation: true,
                    pictureGarden: true,
                    difficulty: true,
                    exposition: true,
                    pets: { include: { pet: true } },
                    plants: {
                        include: {
                            plant: {
                                include: {
                                    difficulty: true,
                                    exposition: true,
                                    localisation: true,
                                    watering: true,
                                    picturePlant: true,
                                    categories: { include: { category: true } },
                                    tags: { include: { tag: true } },
                                    sowingDates: { include: { sowingDate: true } },
                                    harvestDates: { include: { harvestDate: true } },
                                    plantDates: { include: { plantDate: true } },
                                    toxicPets: true
                                }
                            }
                        }
                    }
                }
            });

            return res.status(200).json(updatedGarden);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur serveur lors de la mise à jour du jardin.",
                error
            });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: "ID invalide." });
            }

            // Vérifier que le jardin existe
            const existingGarden = await prisma.garden.findUnique({ where: { id } });
            if (!existingGarden) {
                return res.status(404).json({ message: "Jardin introuvable." });
            }

            // Supprimer les relations Many-to-Many
            await prisma.gardenHasPlant.deleteMany({ where: { gardenId: id } });
            await prisma.gardenHasPet.deleteMany({ where: { gardenId: id } });

            // Supprimer le jardin
            await prisma.garden.delete({ where: { id } });

            return res.status(200).json({ message: "Jardin supprimé avec succès." });

        } catch (error: any) {
            console.error(error);

            // Gestion spécifique pour les erreurs de contrainte de clé étrangère
            if (error.code === "P2003") {
                return res.status(400).json({
                    message: "Impossible de supprimer le jardin : des relations existent encore.",
                    error
                });
            }

            return res.status(500).json({
                message: "Erreur serveur lors de la suppression du jardin.",
                error
            });
        }
    }
};