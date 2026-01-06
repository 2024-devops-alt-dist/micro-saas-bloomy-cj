import { describe, it, beforeAll, afterAll, expect } from "vitest";
import { usersController } from "./usersController";
import { prisma } from "../lib/prisma";
import { Request } from "express";
import { createMockResponse } from "../test/utils/testHelpers";

describe("usersController.getAll (DB existante)", () => {
    let existingUsers: any[] = [];

    beforeAll(async () => {
        existingUsers = await prisma.user.findMany({
            select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true,
                picture_profil: true,
                registration_date: true,
                role: true,
            },
        });
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("doit retourner tous les utilisateurs avec status 200", async () => {
        const req = {} as Request;
        const res = createMockResponse();

        await usersController.getAll(req, res);

        // console.log("[LOG] getAllUsers → nombre d'utilisateurs :", res._body?.length);

        expect(res._status).toBe(200);
        expect(res._body).toBeInstanceOf(Array);
        expect(res._body.length).toBe(existingUsers.length);
    });
});

describe("usersController.getById (DB existante)", () => {
    let existingUser: any;

    beforeAll(async () => {
        const users = await prisma.user.findMany({
            include: {
                gardens: true,
                favoryPlants: { include: { plant: true } }
            }
        });
        existingUser = users[0] || null;
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("doit retourner 400 si l'ID est invalide", async () => {
        const req = { params: { id: "abc" } } as unknown as Request;
        const res = createMockResponse();

        await usersController.getById(req, res);

        // console.log("[LOG] getById ID invalide → body :", res._body);

        expect(res._status).toBe(400);
        expect(res._body.message).toBe("ID invalide.");
    });

    it("doit retourner 404 si l'utilisateur n'existe pas", async () => {
        const req = { params: { id: "999999999" } } as unknown as Request;
        const res = createMockResponse();

        await usersController.getById(req, res);

        // console.log("[LOG] getById inexistant → body :", res._body);

        expect(res._status).toBe(404);
        expect(res._body.message).toMatch(/introuvable/i);
    });

    it("doit retourner l'utilisateur existant avec status 200", async () => {
        if (!existingUser) return;

        const req = { params: { id: existingUser.id.toString() } } as unknown as Request;
        const res = createMockResponse();

        await usersController.getById(req, res);

        // console.log("[LOG] getById OK → utilisateur retourné :", {
        //     id: res._body?.id,
        //     email: res._body?.email,
        //     gardensCount: res._body?.gardens?.length,
        //     favoryPlantsCount: res._body?.favoryPlants?.length
        // });

        expect(res._status).toBe(200);
        expect(res._body.id).toBe(existingUser.id);
        expect(res._body.email).toBe(existingUser.email);
        expect(res._body.password).toBeUndefined(); // sécurité
        expect(res._body.gardens).toBeInstanceOf(Array);
        expect(res._body.favoryPlants).toBeInstanceOf(Array);
    });
});

describe("usersController.create", () => {
    let testEmail: string;

    beforeAll(async () => {
        testEmail = `testuser@vitest.com`;
        await prisma.user.deleteMany({ where: { email: testEmail } }); 
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("doit retourner 400 si le prénom est trop court", async () => {
        const req = { body: { firstname: "A", lastname: "Test", email: testEmail, password: "password123" } } as any as Request;
        const res = createMockResponse();

        await usersController.create(req, res);
        // console.log("[LOG] create prénom trop court → body :", res._body);

        expect(res._status).toBe(400);
        expect(res._body.message).toMatch(/prénom/i);
    });

    it("doit retourner 400 si le nom est trop court", async () => {
        const req = { body: { firstname: "Test", lastname: "B", email: testEmail, password: "password123" } } as any as Request;
        const res = createMockResponse();

        await usersController.create(req, res);
        // console.log("[LOG] create nom trop court → body :", res._body);

        expect(res._status).toBe(400);
        expect(res._body.message).toMatch(/nom/i);
    });

    it("doit retourner 400 si l'email est invalide", async () => {
        const req = { body: { firstname: "Test", lastname: "User", email: "invalid-email", password: "password123" } } as any as Request;
        const res = createMockResponse();

        await usersController.create(req, res);
        // console.log("[LOG] create email invalide → body :", res._body);

        expect(res._status).toBe(400);
        expect(res._body.message).toMatch(/email/i);
    });

    it("doit retourner 400 si le mot de passe est trop court", async () => {
        const req = { body: { firstname: "Test", lastname: "User", email: testEmail, password: "123" } } as any as Request;
        const res = createMockResponse();

        await usersController.create(req, res);
        // console.log("[LOG] create mot de passe court → body :", res._body);

        expect(res._status).toBe(400);
        expect(res._body.message).toMatch(/mot de passe/i);
    });

    it("doit créer un utilisateur valide et retourner 201", async () => {
        const req = {
            body: { firstname: "Test", lastname: "User", email: testEmail, password: "123456789", role: "user" }
        } as any as Request;

        const res = createMockResponse();

        await usersController.create(req, res);
        // console.log("[LOG] create OK → utilisateur créé :", res._body);

        expect(res._status).toBe(201);
        expect(res._body.email).toBe(testEmail);
        expect(res._body.firstname).toBe("Test");
        expect(res._body.lastname).toBe("User");
        expect(res._body.password).toBeUndefined();
    });

    it("doit retourner 400 si l'email existe déjà", async () => {
        const req = { body: { firstname: "Test", lastname: "User", email: testEmail, password: "123456789" } } as any as Request;
        const res = createMockResponse();

        await usersController.create(req, res);
        // console.log("[LOG] create email déjà existant → body :", res._body);

        expect(res._status).toBe(400);
        expect(res._body.message).toMatch(/existe déjà/i);
    });
});

describe("usersController.update (utilisateur existant)", () => {
    let userToUpdate: any;

    beforeAll(async () => {
        // On prend le premier utilisateur existant dans la base
        userToUpdate = await prisma.user.findFirst();

        if (!userToUpdate) {
            console.warn("Aucun utilisateur trouvé pour update → test ignoré");
        }
    });

    it("doit retourner 400 si l'ID est invalide", async () => {
        const req = {
            params: { id: "abc" },
            body: { firstname: "Nom invalide" }
        } as unknown as Request;

        const res = createMockResponse();

        await usersController.update(req, res);
        // console.log("[LOG] update ID invalide → body :", res._body);

        expect(res._status).toBe(400);
        expect(res._body.message).toBe("ID invalide.");
    });

    it("doit retourner 404 si l'utilisateur n'existe pas", async () => {
        const req = {
            params: { id: "999999999" },
            body: { firstname: "Utilisateur fantôme" }
        } as unknown as Request;

        const res = createMockResponse();

        await usersController.update(req, res);
        // console.log("[LOG] update inexistant → body :", res._body);

        expect(res._status).toBe(404);
        expect(res._body.message).toMatch(/introuvable/i);
    });

    it("doit mettre à jour un utilisateur existant et retourner 200", async () => {
        if (!userToUpdate) return;

        const updatedFirstname = userToUpdate.firstname + " (modifié)";
        const updatedLastname = userToUpdate.lastname + " (modifié)";

        const req = {
            params: { id: userToUpdate.id.toString() },
            body: {
                firstname: updatedFirstname,
                lastname: updatedLastname,
            }
        } as unknown as Request;

        const res = createMockResponse();

        await usersController.update(req, res);

        // console.log("[LOG] Données envoyées au update →", {
        //     id: userToUpdate.id,
        //     firstname: updatedFirstname,
        //     lastname: updatedLastname,
        //     email: updatedEmail
        // });

        expect(res._status).toBe(200);
        expect(res._body.firstname).toBe(updatedFirstname);
        expect(res._body.lastname).toBe(updatedLastname);
        expect(res._body.password).toBeUndefined(); 
    });
});

describe("usersController.delete (utilisateur existant)", () => {
    let userToDelete: any;

    beforeAll(async () => {
        userToDelete = await prisma.user.findFirst();
    });

    it("doit retourner 400 si l'ID est invalide", async () => {
        const req = { params: { id: "abc" } } as unknown as Request;
        const res = createMockResponse();

        await usersController.delete(req, res);
        // console.log("[LOG] delete ID invalide → body :", res._body);

        expect(res._status).toBe(400);
        expect(res._body.message).toBe("ID invalide.");
    });

    it("doit retourner 404 si l'utilisateur n'existe pas", async () => {
        const req = { params: { id: "999999999" } } as unknown as Request;
        const res = createMockResponse();

        await usersController.delete(req, res);
        // console.log("[LOG] delete inexistant → body :", res._body);

        expect(res._status).toBe(404);
        expect(res._body.message).toMatch(/introuvable/i);
    });

    it("doit supprimer un utilisateur existant et retourner 200", async () => {
        if (!userToDelete) return;

        const req = { params: { id: userToDelete.id.toString() } } as unknown as Request;
        const res = createMockResponse();

        // console.log("[LOG] ID envoyé pour delete :", userToDelete.id);

        await usersController.delete(req, res);
        // console.log("[LOG] delete OK → body :", res._body);

        expect(res._status).toBe(200);
        expect(res._body.message).toMatch(/supprimé/i);
    });
});
