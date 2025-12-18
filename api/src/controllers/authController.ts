import { Request, Response } from "express";
import { prisma } from "../lib/prisma"; 
import bcrypt from "bcrypt";
import logger from "../middlewares/logger";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../middlewares/jwt";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // HTTPS uniquement en prod
  sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const, // Politique CORS cookies
  path: '/', // Cookie dispo sur tout le site
};

// note : garder en cohérence avec `JWT_ACCESS_EXPIRES_IN` / `JWT_REFRESH_EXPIRES_IN` dans config/env
const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000; // 15 minutes
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

export const authController = {
    login: async (req: Request, res: Response) => {
        try {
            // Vérification des champs requis
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({ message: "Email et mot de passe requis." });

            // Recherche user dans la bdd
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(401).json({ message: "Email ou mot de passe invalide." });

            // Vérifie le mdp hashé
            const valid = await bcrypt.compare(password, user.password || "");
            if (!valid) return res.status(401).json({ message: "Email ou mot de passe invalide." }); // note : par raison de sécuirté, on ne précise pas si c'est l'email ou le mot de passe qui est invalide

            // Génère les tokens 
            const payload = { id: user.id, email: user.email, role: user.role };
            const accessToken = createAccessToken(payload); // token court terme (1h)
            const refreshToken = createRefreshToken({ id: user.id }); // token long terme (7 jours)

            // Envoie tokens via cookies HttpOnly
            res.status(200)
              .cookie("access_token", accessToken, { ...COOKIE_OPTIONS, maxAge: ACCESS_TOKEN_MAX_AGE })
              .cookie("refresh_token", refreshToken, { ...COOKIE_OPTIONS, maxAge: REFRESH_TOKEN_MAX_AGE })
              .json({ status: 200, message: "Authenticated", user: { id: user.id, email: user.email, role: user.role } });

            logger.info(`User authenticated: ${user.email}`);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur serveur lors de la connexion.", error });
        }
    },

  refresh: async (req: Request, res: Response) => {
    try {
      // Récupère refresh token depuis cookies envoyés par client
      const refreshToken = (req as any).cookies?.refresh_token;
      if (!refreshToken) return res.status(401).json({ message: "Refresh token manquant." });

      // Vérifie et décode le refresh token
      let payload: any;
      try {
        payload = verifyRefreshToken(refreshToken);
      } catch (err) {
        // Si le refresh token est invalide, on le supprime côté client pour éviter boucles
        res.clearCookie("refresh_token", COOKIE_OPTIONS);
        return res.status(401).json({ message: "Refresh token invalide." });
      }

      // Récupère l'utilisateur lié au token
      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      if (!user) {
        res.clearCookie("refresh_token", COOKIE_OPTIONS);
        return res.status(401).json({ message: "Utilisateur introuvable." });
      }

      // Crée un nouvel access token ET un nouveau refresh token
      const newAccessToken = createAccessToken({ id: user.id, email: user.email, role: user.role });
      const newRefreshToken = createRefreshToken({ id: user.id });
      logger.info(`[REFRESH] Nouveaux tokens générés pour ${user.email}`);
      res
        .cookie("access_token", newAccessToken, { ...COOKIE_OPTIONS, maxAge: ACCESS_TOKEN_MAX_AGE })
        .cookie("refresh_token", newRefreshToken, { ...COOKIE_OPTIONS, maxAge: REFRESH_TOKEN_MAX_AGE })
        .status(200)
        .json({ user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur lors du refresh.", error });
    }
  },

    logout: async (_req: Request, res: Response) => {
      // Supprime les cookies d’authentification
      res.clearCookie("access_token", COOKIE_OPTIONS);
      res.clearCookie("refresh_token", COOKIE_OPTIONS);
      return res.status(200).json({ message: "Déconnecté." });
    },

    // Retourne l’utilisateur courant
    me: async (req: Request, res: Response) => {
        try {
          // Récupérer info user depuis middleware d’authentification
          const userPayload = (req as any).user;
          if (!userPayload) return res.status(401).json({ message: "Non authentifié." });

           // Récupération de l'utilisateur en base de données
          const user = await prisma.user.findUnique({ where: { id: userPayload.id } });
          if (!user) return res.status(401).json({ message: "Utilisateur introuvable." });

          logger.info(`[ME] Utilisateur authentifié : ${user.email}`);
          return res.status(200).json({ user: { id: user.id, email: user.email, role: user.role } });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Erreur serveur.", error });
        }
    },
};
