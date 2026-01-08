import { describe, it, beforeAll, afterAll, expect, vi } from "vitest";
import request from "supertest";
import express, { Express } from "express";
import cookieParser from "cookie-parser";

import { router as gardenRoutes } from "./gardenRoutes";
import { prisma } from "../lib/prisma";

// --- Mock des middlewares ---
vi.mock("../middlewares/auth", () => ({
    default: (req: any, _res: any, next: any) => {
        // On simule un utilisateur connecté
        req.user = { id: 1, role: "admin" };
        next();
    }
}));

vi.mock("../middlewares/isGardenOwnerOrAdmin", () => ({
    default: (_req: any, _res: any, next: any) => {
        // On autorise toujours l'accès
        next();
    }
}));

describe("Routes /gardens", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(cookieParser());
        app.use(express.json());
        app.use("/", gardenRoutes);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("GET /gardens → doit retourner 200 avec tous les jardins", async () => {
        const res = await request(app).get("/gardens");
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it("GET /gardens/me → doit retourner 200 avec les jardins de l'utilisateur", async () => {
        const res = await request(app).get("/gardens/me");
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
        // Vérifie que tous les jardins appartiennent à l'user mocké
        res.body.forEach((garden: any) => {
        expect(garden.user.id).toBe(1);
        });
    });

    it("GET /gardens/:id → doit retourner 200 pour un jardin existant", async () => {
        const garden = await prisma.garden.findFirst();
        if (!garden) return;

        const res = await request(app).get(`/gardens/${garden.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(garden.id);
    });

    it("GET /gardens/:id → doit retourner 404 pour un jardin inexistant", async () => {
        const res = await request(app).get("/gardens/999999999");
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/introuvable/i);
    });

    it("POST /gardens → doit créer un jardin et retourner 201", async () => {
        const res = await request(app)
        .post("/gardens")
        .send({
            name: `Jardin test Vitest ${Date.now()}`,
            description: "Description test",
            id_localisation: 1,
            id_picture_garden: null,
            id_difficulty: 1,
            id_exposition: 1,
            plants: [],
            pets: []
        });

        expect(res.status).toBe(201);
        expect(res.body.name).toContain("Jardin test Vitest");

        // Cleanup : supprimer le jardin
        await prisma.garden.delete({ where: { id: res.body.id } });
    });

    it("PUT /gardens/:id → doit mettre à jour un jardin existant", async () => {
        let garden = await prisma.garden.findFirst();
        if (!garden) {
        // Créer un jardin temporaire si aucun n'existe
        garden = await prisma.garden.create({
            data: {
            name: "Temp garden for update",
            description: "",
            id_user: 1,
            id_localisation: 1,
            id_difficulty: 1,
            id_exposition: 1
            }
        });
        }

        const res = await request(app)
        .put(`/gardens/${garden.id}`)
        .send({ name: "Nom modifié Vitest" });

        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Nom modifié Vitest");

        // Restauration du nom original
        await prisma.garden.update({ where: { id: garden.id }, data: { name: garden.name } });
    });

    it("DELETE /gardens/:id → doit supprimer un jardin", async () => {
        // Créer un jardin temporaire pour supprimer
        const garden = await prisma.garden.create({
        data: {
            name: `Temp garden delete ${Date.now()}`,
            description: "À supprimer",
            id_user: 1,
            id_localisation: 1,
            id_difficulty: 1,
            id_exposition: 1
        }
        });

        const res = await request(app).delete(`/gardens/${garden.id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/supprimé/i);

        const check = await prisma.garden.findUnique({ where: { id: garden.id } });
        expect(check).toBeNull();
    });
});
