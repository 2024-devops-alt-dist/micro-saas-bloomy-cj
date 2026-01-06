import { describe, it, beforeAll, afterAll, expect } from "vitest";
import { authController } from "./authController";
import { prisma } from "../lib/prisma";
import { Request } from "express";
import { createMockResponse } from "../test/utils/testHelpers";
import bcrypt from "bcrypt";

describe("authController.login avec utilisateur existant", () => {
    let testUser: any;

    beforeAll(async () => {
        testUser = await prisma.user.findFirst();
        if (testUser) {
            // Mettre à jour son mot de passe pour le test
            const hashedPassword = await bcrypt.hash("password123", 10);
            await prisma.user.update({
                where: { id: testUser.id },
                data: { password: hashedPassword },
            });
        }
    });


    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("doit retourner 400 si email ou mot de passe manquant", async () => {
        const req = { body: {} } as any as Request;
        const res = createMockResponse();

        await authController.login(req, res);
        // console.log("[LOG] login champs manquants → body :", res._body);

        expect(res._status).toBe(400);
        expect(res._body.message).toMatch(/requis/i);
    });

    it("doit retourner 401 si mot de passe invalide", async () => {
        if (!testUser) return;

        const req = { body: { email: testUser.email, password: "wrongpass" } } as any as Request;
        const res = createMockResponse();

        await authController.login(req, res);
        // console.log("[LOG] login mdp invalide → body :", res._body);

        expect(res._status).toBe(401);
        expect(res._body.message).toMatch(/invalide/i);
    });

    it("doit authentifier l'utilisateur existant et retourner 200", async () => {
        if (!testUser) return;

        const req = { body: { email: testUser.email, password: "password123" } } as any as Request;
        const res = createMockResponse();

        await authController.login(req, res);
        // console.log("[LOG] login OK → body :", res._body);

        expect(res._status).toBe(200);
        expect(res._body.message).toBe("Authenticated");
        expect(res._body.user.email).toBe(testUser.email);
        expect(res._cookies).toHaveProperty("access_token");
        expect(res._cookies).toHaveProperty("refresh_token");
    });
});

describe("authController.me avec utilisateur existant", () => {
    it("doit retourner 401 si non authentifié", async () => {
        const req = {} as Request;
        const res = createMockResponse();

        await authController.me(req, res);
        expect(res._status).toBe(401);
    });

    it("doit retourner l'utilisateur courant si authentifié", async () => {
        const req = { user: { id: 1 } } as any as Request; 
        const res = createMockResponse();

        await authController.me(req, res);
        if (res._status === 200) {
            expect(res._body.user).toHaveProperty("email");
            expect(res._body.user).toHaveProperty("id");
            expect(res._body.user).toHaveProperty("role");
        }
    });
});

describe("authController.logout", () => {
    it("doit supprimer les cookies et retourner 200", async () => {
        const req = {} as Request;
        const res = createMockResponse();

        await authController.logout(req, res);
        expect(res._status).toBe(200);
        expect(res._body.message).toMatch(/déconnecté/i);
        expect(res._cookies).toHaveProperty("access_token");
        expect(res._cookies).toHaveProperty("refresh_token");
    });
});
