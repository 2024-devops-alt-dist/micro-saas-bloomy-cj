import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

// Helper pour formater la plante
const formatPlant = (plant: any) => ({
    ...plant,
    categories: plant.categories?.map((pc: any) => pc.category) || [],
    toxicPets: plant.toxicPets?.map((tp: any) => ({
        ...tp,
        pet: tp.pet || null
    })) || [],
    sowingDates: plant.sowingDates?.map((d: any) => d.sowingDate) || [],
    plantDates: plant.plantDates?.map((d: any) => d.plantDate) || [],
    harvestDates: plant.harvestDates?.map((d: any) => d.harvestDate) || [],
});

export const plantController = {
    getAll: async (_req: Request, res: Response) => {
        try {
            const plants = await prisma.plant.findMany({
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
                    toxicPets: { include: { pet: true } }, // Inclure le pet
                },
            });

            const formattedPlants = plants.map(formatPlant);

            res.status(200).json(formattedPlants);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },

    getById: async (req: Request, res: Response) => {
        try {
            const plantId = Number(req.params.id);
            if (isNaN(plantId)) {
                return res.status(400).json({ message: "ID invalide." });
            }

            const plant = await prisma.plant.findUnique({
                where: { id: plantId },
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
                    toxicPets: { include: { pet: true } }, // Inclure le pet
                },
            });

            if (!plant) {
                return res.status(404).json({ message: `Plante avec l'ID ${plantId} introuvable.` });
            }

            const formattedPlant = formatPlant(plant);
            res.status(200).json(formattedPlant);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur serveur", error });
        }
    },


    create: async (req: Request, res: Response) => {
        try {
            const { slug, parent_slug, name, description, space_between, temperature, id_difficulty, id_exposition, id_watering, id_picture_plant, id_localisation, categories, tags, sowingDates, harvestDates, plantDates, toxicPets } = req.body;

            // Vérification du slug unique
            const existing = await prisma.plant.findUnique({ where: { slug } });
            if (existing) {
                return res.status(400).json({ message: `Une plante avec le slug '${slug}' existe déjà.` });
            }

            // Création de la plante (partie simple)
            const plant = await prisma.plant.create({
                data: {
                    slug,
                    parent_slug,
                    name,
                    description,
                    space_between,
                    temperature,
                    id_difficulty,
                    id_exposition,
                    id_watering,
                    id_picture_plant,
                    id_localisation
                }
            });

            const plantId = plant.id;

            // --- Relations Many-to-Many ---
            if (Array.isArray(categories)) {
                await prisma.plantHasCategory.createMany({
                    data: categories.map((categoryId: number) => ({
                        plantId,
                        categoryId
                    })),
                    skipDuplicates: true
                });
            }

            if (Array.isArray(tags)) {
                await prisma.plantHasTag.createMany({
                    data: tags.map((tagId: number) => ({
                        plantId,
                        tagId
                    })),
                    skipDuplicates: true
                });
            }

            if (Array.isArray(sowingDates)) {
                await prisma.plantHasSowingDate.createMany({
                    data: sowingDates.map((sowingDateId: number) => ({
                        plantId,
                        sowingDateId
                    })),
                    skipDuplicates: true
                });
            }

            if (Array.isArray(harvestDates)) {
                await prisma.plantHasHarvestDate.createMany({
                    data: harvestDates.map((harvestDateId: number) => ({
                        plantId,
                        harvestDateId
                    })),
                    skipDuplicates: true
                });
            }

            if (Array.isArray(plantDates)) {
                await prisma.plantHasPlantDate.createMany({
                    data: plantDates.map((plantDateId: number) => ({
                        plantId,
                        plantDateId
                    })),
                    skipDuplicates: true
                });
            }

            if (Array.isArray(toxicPets)) {
                await prisma.plantHasToxicPet.createMany({
                    data: toxicPets.map((tp: any) => ({
                        plantId,
                        petId: tp.petId,
                        niveauToxicite: tp.niveauToxicite
                    })),
                    skipDuplicates: true
                });
            }

            // Re-fetch avec includes
            const createdPlant = await prisma.plant.findUnique({
                where: { id: plantId },
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
                },
            });

            return res.status(201).json(createdPlant);

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur serveur lors de la création de la plante", error });
        }
    },
    
    delete: async (req: Request, res: Response) => {
        try {
            const plantId = Number(req.params.id);

            if (isNaN(plantId)) {
                return res.status(400).json({ message: "ID invalide." });
            }

            // Vérifier que la plante existe
            const plant = await prisma.plant.findUnique({
                where: { id: plantId }
            });

            if (!plant) {
                return res.status(404).json({ message: `Plante avec l'id ${plantId} introuvable.` });
            }

            // Supprimer les relations Many-to-Many
            await prisma.plantHasCategory.deleteMany({
                where: { plantId }
            });

            await prisma.plantHasTag.deleteMany({
                where: { plantId }
            });

            await prisma.plantHasSowingDate.deleteMany({
                where: { plantId }
            });

            await prisma.plantHasHarvestDate.deleteMany({
                where: { plantId }
            });

            await prisma.plantHasPlantDate.deleteMany({
                where: { plantId }
            });

            await prisma.plantHasToxicPet.deleteMany({
                where: { plantId }
            });

            await prisma.gardenHasPlant.deleteMany({
                where: { plantId }
            });

            // Enfin : supprimer la plante
            await prisma.plant.delete({
                where: { id: plantId }
            });

            return res.status(200).json({ message: "Plante supprimée avec succès." });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur serveur lors de la suppression de la plante.",
                error
            });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const plantId = Number(req.params.id);

            if (isNaN(plantId)) {
                return res.status(400).json({ message: "ID invalide." });
            }

            const { slug, parent_slug, name, description, space_between, temperature, id_difficulty, id_exposition, id_watering, id_picture_plant, id_localisation, categories, tags, sowingDates, harvestDates, plantDates, toxicPets } = req.body;

            // Vérifier si la plante existe
            const existingPlant = await prisma.plant.findUnique({
                where: { id: plantId }
            });

            if (!existingPlant) {
                return res.status(404).json({ message: `Plante avec l'id ${plantId} introuvable.` });
            }

            // Vérifier unicité du slug si modifié
            if (slug && slug !== existingPlant.slug) {
                const slugTaken = await prisma.plant.findUnique({ where: { slug } });
                if (slugTaken) {
                    return res.status(400).json({ message: `Le slug '${slug}' est déjà utilisé.` });
                }
            }

            // Mise à jour des champs simples
            await prisma.plant.update({
                where: { id: plantId },
                data: {
                    slug,
                    parent_slug,
                    name,
                    description,
                    space_between,
                    temperature,
                    id_difficulty,
                    id_exposition,
                    id_watering,
                    id_picture_plant,
                    id_localisation
                }
            });

            // Nettoyer et réinsérer relations Many-to-Many 
            await prisma.plantHasCategory.deleteMany({ where: { plantId } });
            await prisma.plantHasTag.deleteMany({ where: { plantId } });
            await prisma.plantHasSowingDate.deleteMany({ where: { plantId } });
            await prisma.plantHasHarvestDate.deleteMany({ where: { plantId } });
            await prisma.plantHasPlantDate.deleteMany({ where: { plantId } });
            await prisma.plantHasToxicPet.deleteMany({ where: { plantId } });

            // Réinsertion selon req.body
            if (Array.isArray(categories)) {
                await prisma.plantHasCategory.createMany({
                    data: categories.map((categoryId: number) => ({
                        plantId,
                        categoryId
                    }))
                });
            }

            if (Array.isArray(tags)) {
                await prisma.plantHasTag.createMany({
                    data: tags.map((tagId: number) => ({
                        plantId,
                        tagId
                    }))
                });
            }

            if (Array.isArray(sowingDates)) {
                await prisma.plantHasSowingDate.createMany({
                    data: sowingDates.map((sowingDateId: number) => ({
                        plantId,
                        sowingDateId
                    }))
                });
            }

            if (Array.isArray(harvestDates)) {
                await prisma.plantHasHarvestDate.createMany({
                    data: harvestDates.map((harvestDateId: number) => ({
                        plantId,
                        harvestDateId
                    }))
                });
            }

            if (Array.isArray(plantDates)) {
                await prisma.plantHasPlantDate.createMany({
                    data: plantDates.map((plantDateId: number) => ({
                        plantId,
                        plantDateId
                    }))
                });
            }

            if (Array.isArray(toxicPets)) {
                await prisma.plantHasToxicPet.createMany({
                    data: toxicPets.map((tp: any) => ({
                        plantId,
                        petId: tp.petId,
                        niveauToxicite: tp.niveauToxicite
                    }))
                });
            }

            // 🔍 Réponse finale avec toutes les relations
            const fullPlant = await prisma.plant.findUnique({
                where: { id: plantId },
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
            });

            return res.status(200).json(fullPlant);

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Erreur serveur lors de la mise à jour de la plante.",
                error
            });
        }
    }
};