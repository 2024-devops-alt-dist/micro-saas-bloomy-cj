import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import bcrypt from "bcrypt";
import logger from "../middlewares/logger";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../middlewares/jwt";

const prisma = new PrismaClient();

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" as const : "lax" as const,
  path: '/',
};

export const authController = {
    login: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                return res.status(400).json({ message: "Email et mot de passe requis." });

            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(401).json({ message: "Email ou mot de passe invalide." });

            const valid = await bcrypt.compare(password, user.password || "");
            if (!valid) return res.status(401).json({ message: "Email ou mot de passe invalide." }); // note : par raison de sécuirté, on ne précise pas si c'est l'email ou le mot de passe qui est invalide

            // Génère les tokens (payload mini pour refresh)
            const payload = { id: user.id, email: user.email, role: user.role };
            const accessToken = createAccessToken(payload);
            const refreshToken = createRefreshToken({ id: user.id });

            // Envoie tokens en cookies HttpOnly
            //const { password: _pw, ...safeUser } = user as any;
            res.status(200)
              .cookie("access_token", accessToken, { ...COOKIE_OPTIONS, maxAge: 60 * 60 * 1000 }) // 1h
              .cookie("refresh_token", refreshToken, { ...COOKIE_OPTIONS, maxAge: 7 * 24 * 60 * 60 * 1000 }) // 7 jours
              .json({ status: 200, message: "Authenticated", user: { id: user.id, email: user.email, role: user.role } });

            logger.info(`User authenticated: ${user.email}`);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erreur serveur lors de la connexion.", error });
        }
    },

  refresh: async (req: Request, res: Response) => {
    try {
      const refreshToken = (req as any).cookies?.refresh_token;
      if (!refreshToken) return res.status(401).json({ message: "Refresh token manquant." });

      // Vérifie et décode le refresh token
      let payload: any;
      try {
        payload = verifyRefreshToken(refreshToken);
      } catch (err) {
        return res.status(401).json({ message: "Refresh token invalide." });
      }

      // Récupère l'utilisateur lié au token
      const user = await prisma.user.findUnique({ where: { id: payload.id } });
      if (!user) return res.status(401).json({ message: "Utilisateur introuvable." });

      // Crée un nouvel access token et le renvoie en cookie httpOnly
      const newAccessToken = createAccessToken({ id: user.id, email: user.email, role: user.role });
      res.cookie("access_token", newAccessToken, { ...COOKIE_OPTIONS, maxAge: 60 * 60 * 1000 }); // 1h

      return res.status(200).json({ user: { id: user.id, email: user.email, role: user.role } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur serveur lors du refresh.", error });
    }
  },

    logout: async (_req: Request, res: Response) => {
      res.clearCookie("access_token", COOKIE_OPTIONS);
      res.clearCookie("refresh_token", COOKIE_OPTIONS);
      return res.status(200).json({ message: "Déconnecté." });
    },

    me: async (req: Request, res: Response) => {
        try {
          const userPayload = (req as any).user;
          if (!userPayload) return res.status(401).json({ message: "Non authentifié." });

          const user = await prisma.user.findUnique({ where: { id: userPayload.id } });
          if (!user) return res.status(401).json({ message: "Utilisateur introuvable." });

          return res.status(200).json({ user: { id: user.id, email: user.email, role: user.role } });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: "Erreur serveur.", error });
        }
    },
};
