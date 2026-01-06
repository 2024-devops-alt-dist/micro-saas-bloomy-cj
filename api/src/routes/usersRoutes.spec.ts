import { describe, it, beforeAll, afterAll, expect, vi } from "vitest";
import request from "supertest";
import express, { Express } from "express";
import cookieParser from "cookie-parser";

import { router as userRoutes } from "./usersRoutes";
import { prisma } from "../lib/prisma";

// --- Mock des middlewares ---
vi.mock("../middlewares/auth", () => ({
    default: (req: any, _res: any, next: any) => {
        req.user = { id: 1, role: "admin" }; // mock utilisateur connecté
        next();
    }
}));

vi.mock("../middlewares/isAdmin", () => ({
    default: (_req: any, _res: any, next: any) => {
        next(); // accès toujours autorisé
    }
}));

vi.mock("../middlewares/isSelfOrAdmin", () => ({
    default: (_req: any, _res: any, next: any) => {
        next(); // accès toujours autorisé
    }
}));

describe("Routes /users", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(cookieParser());
        app.use(express.json());
        app.use("/", userRoutes);
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("GET /users → doit retourner 200 avec tous les utilisateurs", async () => {
        const res = await request(app).get("/users");
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it("GET /users/:id → doit retourner 200 pour un utilisateur existant", async () => {
        const user = await prisma.user.findFirst();
        if (!user) return;

        const res = await request(app).get(`/users/${user.id}`);
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(user.id);
    });

    it("GET /users/:id → doit retourner 404 pour un utilisateur inexistant", async () => {
        const res = await request(app).get("/users/999999999");
        expect(res.status).toBe(404);
        expect(res.body.message).toMatch(/introuvable/i);
    });

    it("POST /users → doit créer un utilisateur et retourner 201", async () => {
        const email = `test${Date.now()}@example.com`;
        const res = await request(app)
            .post("/users")
            .send({
                firstname: "Vitest",
                lastname: "User",
                email,
                password: "password123",
                role: "user"
            });

        expect(res.status).toBe(201);
        expect(res.body.email).toBe(email);

        // Cleanup : supprimer l'utilisateur créé
        await prisma.user.delete({ where: { email } });
    });

    it("PATCH /users/:id → doit mettre à jour un utilisateur existant", async () => {
        let user = await prisma.user.findFirst();
        if (!user) {
            user = await prisma.user.create({
                data: {
                    firstname: "Temp",
                    lastname: "User",
                    email: `temp${Date.now()}@example.com`,
                    password: "password123",
                    role: "user"
                }
            });
        }

        const res = await request(app)
            .patch(`/users/${user.id}`)
            .send({ firstname: "UpdatedName" });

        expect(res.status).toBe(200);
        expect(res.body.firstname).toBe("UpdatedName");

        // Restauration du nom original
        await prisma.user.update({ where: { id: user.id }, data: { firstname: user.firstname } });
    });

    it("DELETE /users/:id → doit supprimer un utilisateur", async () => {
        const user = await prisma.user.create({
            data: {
                firstname: "Temp",
                lastname: "Delete",
                email: `delete${Date.now()}@example.com`,
                password: "password123",
                role: "user"
            }
        });

        const res = await request(app).delete(`/users/${user.id}`);
        expect(res.status).toBe(200);
        expect(res.body.message).toMatch(/supprimé/i);

        const check = await prisma.user.findUnique({ where: { id: user.id } });
        expect(check).toBeNull();
    });
});
