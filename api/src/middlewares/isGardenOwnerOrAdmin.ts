import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma"; 

export default async function isGardenOwnerOrAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const user = (req as any).user;
        if (!user) return res.status(401).json({ message: "Non authentifié." });

        const id = Number(req.params.id);
        if (isNaN(id)) return res.status(400).json({ message: "ID invalide." });

        // récupère le jardin
        const garden = await prisma.garden.findUnique({ where: { id } });
        if (!garden) return res.status(404).json({ message: "Jardin introuvable." });

        const isOwner = Number(garden.id_user) === Number(user.id);
        const isAdmin = user.role === "admin";

        if (!isOwner && !isAdmin) return res.status(403).json({ message: "Accès interdit." });

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur.", error });
    }
}
