import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";
import { verifyAccessToken } from "./jwt";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // On récupère uniquement le token dans le cookie HttpOnly
  const token = (req as any).cookies?.access_token;

  if (!token) {
    return res.status(401).json({ message: "Non authentifié." });
  }

  try {
    const payload = verifyAccessToken(token);
    (req as any).user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou expiré." });
  }
}
