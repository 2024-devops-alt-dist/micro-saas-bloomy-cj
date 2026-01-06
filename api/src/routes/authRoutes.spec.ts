import { describe, it, beforeAll, afterAll, expect, vi } from "vitest";
import bcrypt from "bcrypt";

import { authController } from "../controllers/authController";
import { prisma } from "../lib/prisma";
import { createMockResponse } from "../test/utils/testHelpers";

// Variable globale pour stocker l'utilisateur test
let testUser: any;

// --- Mock du middleware auth pour /me ---
vi.mock("../middlewares/auth", () => ({
  default: (req: any, _res: any, next: any) => {
    if (testUser) {
      req.user = { id: testUser.id, role: "admin" };
    }
    next();
  },
}));

describe("Controllers /auth", () => {
    beforeAll(async () => {
        // Crée un utilisateur test
        const passwordHash = await bcrypt.hash("password123", 10);
        testUser = await prisma.user.create({
            data: {
                email: "testuser@example.com",
                password: passwordHash,
                role: "admin",
                firstname: "Test",
                lastname: "User",
            },
        });
    });

    afterAll(async () => {
        // Supprime l'utilisateur test
        await prisma.user.deleteMany({ where: { email: "testuser@example.com" } });
        await prisma.$disconnect();
    });

    it("login → doit définir les cookies access_token et refresh_token", async () => {
        const req = { body: { email: testUser.email, password: "password123" } };
        const res = createMockResponse();

        await authController.login(req as any, res as any);

        expect(res._status).toBe(200);
        expect(res._cookies).toHaveProperty("access_token");
        expect(res._cookies).toHaveProperty("refresh_token");
    });

    it("login → doit retourner 401 pour mot de passe incorrect", async () => {
        const req = { body: { email: testUser.email, password: "wrongpassword" } };
        const res = createMockResponse();

        await authController.login(req as any, res as any);

        expect(res._status).toBe(401);
        expect(res._body).toHaveProperty("message");
        expect(res._body.message).toMatch(/invalid/i);
    });

    it("refresh → doit retourner 200 ou 401 selon token fourni", async () => {
        const req = { body: { refreshToken: "fakeRefreshToken" } };
        const res = createMockResponse();

        await authController.refresh(req as any, res as any);

        expect([200, 401]).toContain(res._status);
    });

    it("logout → doit retourner 200 et effacer les cookies", async () => {
        const req = { body: { refreshToken: "fakeRefreshToken" } };
        const res = createMockResponse();

        await authController.logout(req as any, res as any);

        expect(res._status).toBe(200);
        expect(res._cookies).toHaveProperty("access_token", null);
        expect(res._cookies).toHaveProperty("refresh_token", null);
    });

    it("me → doit retourner 200 avec les infos de l'utilisateur connecté", async () => {
        const req = { user: { id: testUser.id, role: "admin" } };
        const res = createMockResponse();

        await authController.me(req as any, res as any);

        expect(res._status).toBe(200);
        expect(res._body).toHaveProperty("user");
        expect(res._body.user).toHaveProperty("id", testUser.id);
        expect(res._body.user).toHaveProperty("email", testUser.email);
        expect(res._body.user).toHaveProperty("role", "admin");
    });
});
