import { Request, Response, NextFunction } from "express";

/**
 * Middleware : autorise l'accès si
 * - l'utilisateur agit sur SON PROPRE compte
 * - OU s'il est administrateur
 *
 * Exemple d'usage :
 * GET /users/:id
 * PUT /users/:id
 * DELETE /users/:id
 */

export default function isSelfOrAdmin(req: Request, res: Response, next: NextFunction) {
    const user = (req as any).user;

    if (!user) {
        return res.status(401).json({ message: "Non authentifié." });
    }

    const isAdmin = user.role === "admin";
    // Vérifie si l'utilisateur agit sur son propre compte
    // Comparaison entre l'id de l'URL et l'id du user connecté
    const isSelf = Number(req.params.id) === Number(user.id);

    if (!isAdmin && !isSelf) {
        return res.status(403).json({ message: "Accès interdit." });
    }

    next();
}