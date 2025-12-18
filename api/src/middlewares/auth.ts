import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "./jwt";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // récupération token dans le cookie HttpOnly
  const token = (req as any).cookies?.access_token;

  // Si pas de token → accès refusé
  if (!token) {
    return res.status(401).json({ message: "Jeton d'accès manquant, accès interdit." });
  }

  try {
    // Vérification token :
    // - signature valide
    // - token non expiré
    // Si token valide, on récupère payload
    const payload = verifyAccessToken(token);
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
}
