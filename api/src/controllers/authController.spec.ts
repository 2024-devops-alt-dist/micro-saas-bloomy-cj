import { describe, it, beforeAll, afterAll, expect } from "vitest";
import { authController } from "./authController";
import { prisma } from "../lib/prisma";
import { Request } from "express";
import { createMockResponse } from "../test/utils/testHelpers";
import bcrypt from "bcrypt";

let testUser: any;

beforeAll(async () => {
    const hashedPassword = await bcrypt.hash("password123", 10);

    testUser = await prisma.user.create({
        data: {
            firstname: "Test",
            lastname: "User",
            email: `test-${Date.now()}@example.com`,
            password: hashedPassword,
            picture_profil: "default.jpg",
            role: "user",
        },
    });
});

afterAll(async () => {
    if (testUser) {
        await prisma.user.delete({
            where: { id: testUser.id },
        });
    }

    await prisma.$disconnect();
});

describe("authController.login", () => {

    it("doit retourner 400 si email ou mot de passe manquant", async () => {
        const req = { body: {} } as any as Request;
        const res = createMockResponse();

        await authController.login(req, res);

        expect(res._status).toBe(400);
        expect(res._body.message).toMatch(/requis/i);
    });

    it("doit retourner 401 si mot de passe invalide", async () => {
        const req = {
            body: { email: testUser.email, password: "wrongpass" },
        } as any as Request;

        const res = createMockResponse();

        await authController.login(req, res);

        expect(res._status).toBe(401);
        expect(res._body.message).toMatch(/invalide/i);
    });

    it("doit authentifier l'utilisateur existant et retourner 200", async () => {
        const req = {
            body: { email: testUser.email, password: "password123" },
        } as any as Request;

        const res = createMockResponse();

        await authController.login(req, res);

        expect(res._status).toBe(200);
        expect(res._body.message).toBe("Authenticated");
        expect(res._body.user.email).toBe(testUser.email);

        expect(res._cookies).toHaveProperty("access_token");
        expect(res._cookies).toHaveProperty("refresh_token");
    });

});

describe("authController.me", () => {

    it("doit retourner 401 si non authentifié", async () => {
        const req = {} as Request;
        const res = createMockResponse();

        await authController.me(req, res);

        expect(res._status).toBe(401);
    });

    it("doit retourner l'utilisateur courant si authentifié", async () => {
        const req = {
            user: { id: testUser.id },
        } as any as Request;

        const res = createMockResponse();

        await authController.me(req, res);

        expect(res._status).toBe(200);
        expect(res._body.user.email).toBe(testUser.email);
        expect(res._body.user).toHaveProperty("id");
        expect(res._body.user).toHaveProperty("role");
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