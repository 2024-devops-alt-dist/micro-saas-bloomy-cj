import { Request, Response } from "express";
import { prisma } from "../lib/prisma"; 

export const commonController = {
    getAllLocalisation: async (_req: Request, res: Response) => {
        try {
            const localisations = await prisma.localisation.findMany({
                select: {
                    id: true,
                    name: true,
                    icon: true,
                }
            });

            return res.status(200).json(localisations);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur lors de la récupération des localisations.", error });
        }
    },
    getAllExpositions: async (_req: Request, res: Response) => {
        try {
            const expositions = await prisma.exposition.findMany({
                select: {
                    id: true,
                    name: true,
                    description: true,
                    icon: true,
                }
            });

            return res.status(200).json(expositions);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur lors de la récupération des expositions.", error });
        }
    },
    getAllPets: async (_req: Request, res: Response) => {
        try {
            const pets = await prisma.pets.findMany({
                select: {
                    id: true,
                    name: true,
                    icon: true,
                }
            });

            return res.status(200).json(pets);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur lors de la récupération des animaux de compagnie.", error });
        }
    },
};
