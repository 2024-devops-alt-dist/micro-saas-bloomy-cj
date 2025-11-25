import { Request, Response, NextFunction } from "express";

export default function isSelfOrAdmin(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;

    if (!user) {
        return res.status(401).json({ message: "Non authentifié." });
    }

    const isAdmin = user.role === "admin";
    const isSelf = Number(req.params.id) === Number(user.id);

    if (!isAdmin && !isSelf) {
        return res.status(403).json({ message: "Accès interdit." });
    }

    next();
}