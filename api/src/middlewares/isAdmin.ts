import { Request, Response, NextFunction } from "express";

export default function isAdmin(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;

    // Si l'utilisateur n'est pas chargé par authMiddleware
    if (!user) {
        return res.status(401).json({ message: "Non authentifié." });
    }

    // Vérifie le rôle
    if (user.role !== "admin") {
        return res.status(403).json({ message: "Accès refusé : rôle admin requis." });
    }

    next(); 
}
