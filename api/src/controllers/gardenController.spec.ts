import { describe, it, beforeAll, afterAll, expect } from "vitest";
import { gardenController } from "./gardenController";
import { prisma } from "../lib/prisma";
import { Request } from "express";
import { createMockResponse } from "../test/utils/testHelpers";

describe("gardenController.getAll (DB existante)", () => {
    let existingGardens: any[] = [];

    beforeAll(async () => {
        existingGardens = await prisma.garden.findMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("doit retourner tous les jardins avec status 200", async () => {
        const req = {} as Request;
        const res = createMockResponse();

        await gardenController.getAll(req, res);
        // console.log("[LOG] Nombre de jardins retournés :", res._body?.length);

        expect(res._status).toBe(200);
        expect(res._body).toBeInstanceOf(Array);
        expect(res._body.length).toBe(existingGardens.length);
    });
});

describe("gardenController.getById", () => {
    let existingGarden: any;

    beforeAll(async () => {
        const gardens = await prisma.garden.findMany();
        existingGarden = gardens[0] || null;
    });

    it("doit retourner 400 si l'ID est invalide", async () => {
        const req = { params: { id: "abc" } } as unknown as Request;
        const res = createMockResponse();

        await gardenController.getById(req, res);
        // console.log("[LOG] getById ID invalide → body :", res._body);

        expect(res._status).toBe(400);
        expect(res._body.message).toBe("ID invalide.");
    });

    it("doit retourner 404 si le jardin n'existe pas", async () => {
        const req = { params: { id: "999999999" } } as unknown as Request;
        const res = createMockResponse();

        await gardenController.getById(req, res);
        // console.log("[LOG] getById inexistant → body :", res._body);

        expect(res._status).toBe(404);
        expect(res._body.message).toMatch(/introuvable/i);
    });

    it("doit retourner le jardin existant avec status 200", async () => {
        if (!existingGarden) return;

        const req = { params: { id: existingGarden.id.toString() } } as unknown as Request;
        const res = createMockResponse();

        await gardenController.getById(req, res);
        // console.log("[LOG] getById OK → jardin retourné :", {
        //     id: res._body?.id,
        //     name: res._body?.name
        // });

        expect(res._status).toBe(200);
        expect(res._body.id).toBe(existingGarden.id);
        expect(res._body.name).toBe(existingGarden.name);
    });
});

describe("gardenController.getMine", () => {
    let userWithGardens: any;
    let userGardens: any[] = [];

    beforeAll(async () => {
        userWithGardens = await prisma.user.findFirst({
            include: { gardens: true }
        });

        if (userWithGardens) {
            userGardens = userWithGardens.gardens;
        }
    });

    it("doit retourner 401 si non authentifié", async () => {
        const req = {} as Request;
        const res = createMockResponse();

        await gardenController.getMine(req, res);
        // console.log("[LOG] getMine non authentifié → body :", res._body);

        expect(res._status).toBe(401);
    });

    it("doit retourner les jardins de l'utilisateur connecté", async () => {
        if (!userWithGardens) return;

        const req = { user: { id: userWithGardens.id } } as any as Request;
        const res = createMockResponse();

        await gardenController.getMine(req, res);
        // console.log("[LOG] getMine authentifié → nombre de jardins :", res._body?.length);

        expect(res._status).toBe(200);
        expect(res._body).toBeInstanceOf(Array);
        expect(res._body.length).toBe(userGardens.length);

        if (userGardens.length > 0) {
            expect(res._body[0].id_user).toBe(userWithGardens.id);
        }
    });
});

describe("gardenController.create", () => {
    let createdGardenId: number;
    let user: any;

    beforeAll(async () => {
        user = await prisma.user.findFirst();
    });

    it("doit retourner 401 si non authentifié", async () => {
        const req = { body: {} } as Request;
        const res = createMockResponse();

        await gardenController.create(req, res);

        expect(res._status).toBe(401);
    });

    it("doit retourner 400 si le nom est manquant", async () => {
        if (!user) return;

        const req = { body: {}, user: { id: user.id } } as any as Request;
        const res = createMockResponse();

        await gardenController.create(req, res);
        // console.log("[LOG] create nom manquant → body :", res._body);

        expect(res._status).toBe(400);
    });

    it("doit créer un jardin et retourner 201", async () => {
        if (!user) return;

        const req = {
            body: { name: "Jardin Vitest" },
            user: { id: user.id }
        } as any as Request;

        const res = createMockResponse();

        await gardenController.create(req, res);
        // console.log("[LOG] create OK → jardin retourné :", {
        //     id: res._body?.id,
        //     name: res._body?.name,
        //     id_user: res._body?.id_user
        // });

        expect(res._status).toBe(201);
        expect(res._body.name).toBe("Jardin Vitest");
    });
});

describe("gardenController.update (jardin existant)", () => {
    let gardenToUpdate: any;

    beforeAll(async () => {
        gardenToUpdate = await prisma.garden.findFirst();

        if (!gardenToUpdate) {
            console.warn("Aucun jardin trouvé pour update → test ignoré");
        }
    });

    it("doit retourner 400 si l'ID est invalide", async () => {
        const req = {
            params: { id: "abc" },
            body: { name: "Nom invalide" }
        } as unknown as Request;

        const res = createMockResponse();

        await gardenController.update(req, res);
        // console.log("[LOG] update ID invalide → body :", res._body);

        expect(res._status).toBe(400);
        expect(res._body.message).toBe("ID invalide.");
    });

    it("doit retourner 404 si le jardin n'existe pas", async () => {
        const req = {
            params: { id: "999999999" },
            body: { name: "Jardin fantôme" }
        } as unknown as Request;

        const res = createMockResponse();

        await gardenController.update(req, res);
        // console.log("[LOG] update inexistant → body :", res._body);

        expect(res._status).toBe(404);
        expect(res._body.message).toMatch(/introuvable/i);
    });

    it("doit mettre à jour un jardin existant et retourner 200", async () => {
        if (!gardenToUpdate) return;

        const updatedName = gardenToUpdate.name + " (modifié)";
        const updatedDescription = "Description modifiée par Vitest";

        const req = {
            params: { id: gardenToUpdate.id.toString() },
            body: {
                name: updatedName,
                description: updatedDescription
            }
        } as unknown as Request;

        const res = createMockResponse();

        await gardenController.update(req, res);

        // console.log("[LOG] Données envoyées au update :", {
        //     id: gardenToUpdate.id,
        //     name: updatedName,
        //     description: updatedDescription
        // });

        expect(res._status).toBe(200);
        expect(res._body.name).toBe(updatedName);
        expect(res._body.description).toBe(updatedDescription);
    });
});

describe("gardenController.delete", () => {
    let gardenToDelete: any;

    beforeAll(async () => {
        gardenToDelete = await prisma.garden.findFirst();
    });

    it("doit retourner 404 si le jardin n'existe pas", async () => {
        const req = { params: { id: "9999999" } } as any as Request;
        const res = createMockResponse();

        await gardenController.delete(req, res);
        // console.log("[LOG] delete inexistant → body :", res._body);

        expect(res._status).toBe(404);
    });

    it("doit supprimer un jardin existant", async () => {
        if (!gardenToDelete) return;

        const req = { params: { id: gardenToDelete.id.toString() } } as any as Request;
        const res = createMockResponse();

        // console.log("[LOG] ID envoyé pour delete :", gardenToDelete.id);

        await gardenController.delete(req, res);
        // console.log("[LOG] delete OK → body :", res._body);

        expect(res._status).toBe(200);
        expect(res._body.message).toMatch(/supprimé/i);

    });
});
