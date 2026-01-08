import { describe, it, beforeAll, afterAll, expect, vi } from "vitest";
import request from "supertest";
import express, { Express } from "express";
import cookieParser from "cookie-parser";

import { router as plantRoutes } from "./plantRoutes";
import { plantController } from "../controllers/plantController";
import { prisma } from "../lib/prisma";

// --- Mock des middlewares pour simplifier les tests ---
vi.mock("../middlewares/auth", () => {
    return {
        default: (req: any, _res: any, next: any) => {
            // On simule un utilisateur connecté
            req.user = { id: 1, role: "admin" };
            next();
        }
    };
});

vi.mock("../middlewares/isAdmin", () => {
    return {
        default: (_req: any, _res: any, next: any) => {
            // On autorise toujours l'accès admin
            next();
        }
    };
});

describe("Routes /plants", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(cookieParser());
        app.use(express.json());
        app.use("/", plantRoutes);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("GET /plants → doit retourner 200 avec toutes les plantes", async () => {
        const res = await request(app).get("/plants");
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it("GET /plants/:id → doit retourner 200 pour une plante existante", async () => {
        const plant = await prisma.plant.findFirst();
        if (!plant) return;

        const res = await request(app).get(`/plants/${plant.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(plant.id);
    });

    it("GET /plants/:id → doit retourner 404 pour une plante inexistante", async () => {
        const res = await request(app).get("/plants/999999999");
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/introuvable/i);
    });

    it("POST /plants → doit créer une nouvelle plante et retourner 201", async () => {
        const slug = `test-plant-${Date.now()}`;
        const res = await request(app)
            .post("/plants")
            .send({
                slug,
                parent_slug: null,
                name: "Plante test router",
                description: "Description test",
                space_between: "30",
                temperature: "20-25",
                id_difficulty: 1,
                id_exposition: 1,
                id_watering: 1,
                id_picture_plant: null,
                id_localisation: 1,
                categories: [],
                tags: [],
                sowingDates: [],
                harvestDates: [],
                plantDates: [],
                toxicPets: []
            });

        expect(res.status).toBe(201);
        expect(res.body.slug).toBe(slug);

        // Cleanup : supprimer la plante
        await prisma.plant.delete({ where: { id: res.body.id } });
    });

    it("PUT /plants/:id → doit mettre à jour une plante existante", async () => {
        const plant = await prisma.plant.findFirst();
        if (!plant) return;

        const res = await request(app)
            .put(`/plants/${plant.id}`)
            .send({ name: "Nom modifié" });

        expect(res.status).toBe(200);
        expect(res.body.name).toBe("Nom modifié");

        // Restauration du nom original
        await prisma.plant.update({ where: { id: plant.id }, data: { name: plant.name } });
    });

    it("DELETE /plants/:id → doit supprimer une plante", async () => {
        const plant = await prisma.plant.create({
            data: {
                slug: `temp-delete-${Date.now()}`,
                name: "Plante temporaire",
                description: "",
                space_between: "10",
                temperature: "20",
                id_difficulty: 1,
                id_exposition: 1,
                id_watering: 1,
                id_picture_plant: null,
                id_localisation: 1
            }
        });

        const res = await request(app).delete(`/plants/${plant.id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/supprimée/i);

        const check = await prisma.plant.findUnique({ where: { id: plant.id } });
        expect(check).toBeNull();
    });
});
