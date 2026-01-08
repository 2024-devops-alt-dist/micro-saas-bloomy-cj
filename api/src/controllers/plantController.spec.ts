import { describe, it, beforeAll, afterAll, expect, vi } from "vitest";
import { prisma } from "../lib/prisma";
import { plantController } from "./plantController";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { createMockResponse } from "../test/utils/testHelpers";
dotenv.config({ path: ".env.test" });


describe("plantController.getAll (DB test existante)", () => {
    let existingPlants: any[] = [];

    beforeAll(async () => {
        existingPlants = await prisma.plant.findMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("doit retourner toutes les plantes existantes avec status 200", async () => {
        const req = {} as Request;
        const res = createMockResponse();

        await plantController.getAll(req, res);
        // console.log("Ce que retourne le controller :", res._body);

        expect(res._status).toBe(200);
        expect(res._body).toBeInstanceOf(Array);
        expect(res._body.length).toBe(existingPlants.length);

        if (existingPlants.length > 0) {
        expect(res._body[0].slug).toBe(existingPlants[0].slug);
        }
    });
});

describe("plantController.getById", () => {
    let existingPlant: any;

    beforeAll(async () => {
        const plants = await prisma.plant.findMany();
        existingPlant = plants[0] || null;
    });

    it("doit retourner la plante existante avec status 200", async () => {
        if (!existingPlant) return;

        const req = { params: { id: existingPlant.id.toString() } } as unknown as Request;
        const res = createMockResponse();

        // console.log("ID envoyé au controller :", req.params.id);

        await plantController.getById(req, res);

        // console.log("Status retourné :", res._status);
        // console.log("Body retourné :", res._body);

        expect(res._status).toBe(200);
        expect(res._body).toBeDefined();
        expect(res._body.id).toBe(existingPlant.id);
    });

    it("doit retourner 404 si la plante n'existe pas", async () => {
        const req = { params: { id: "999999999" } } as unknown as Request;
        const res = createMockResponse();

        await plantController.getById(req, res);

        expect(res._status).toBe(404);
        expect(res._body.message).toMatch(/introuvable/);
    });

    it("doit retourner 400 si l'ID est invalide", async () => {
        const req = { params: { id: "abc" } } as unknown as Request;
        const res = createMockResponse();

        await plantController.getById(req, res);

        expect(res._status).toBe(400);
        expect(res._body.message).toBe("ID invalide.");
    });
});

// describe("plantController.create", () => {
//     let createdPlantId: number;

//     it("doit créer une plante et retourner 201", async () => {
//         const req = {
//             body: {
//                 slug: "test-plant-vitest",
//                 parent_slug: null,
//                 name: "Plante test Vitest",
//                 description: "Description test",
//                 space_between: "30",
//                 temperature: "20-25",
//                 id_difficulty: 1,
//                 id_exposition: 1,
//                 id_watering: 1,
//                 id_picture_plant: null,
//                 id_localisation: 1,
//                 categories: [],
//                 tags: [],
//                 sowingDates: [],
//                 harvestDates: [],
//                 plantDates: [],
//                 toxicPets: []
//             }
//         } as Request;

//         const res = createMockResponse();

//         console.log("BODY envoyé au create :", req.body);

//         await plantController.create(req, res);

//         console.log("Status retourné :", res._status);
//         console.log("Body retourné :", res._body);

//         expect(res._status).toBe(201);
//         expect(res._body).toBeDefined();
//         expect(res._body.slug).toBe("test-plant-vitest");

//         createdPlantId = res._body.id;
//         console.log("ID de la plante créée :", createdPlantId);
//     });
// });

describe("plantController.update (plante existante)", () => {
    let plantToUpdate: any;

    beforeAll(async () => {
        plantToUpdate = await prisma.plant.findFirst({
            where: { slug: "tomate" } // ← change ici si besoin
        });

        if (!plantToUpdate) {
            const plants = await prisma.plant.findMany();
            plantToUpdate = plants[0];
        }

        // console.log("Plante récupérée pour UPDATE :", plantToUpdate);
    });

    it("doit mettre à jour une plante existante", async () => {
        if (!plantToUpdate) {
            console.warn("Aucune plante trouvée pour update → test ignoré");
            return;
        }

        const req = {
            params: { id: plantToUpdate.id.toString() },
            body: {
                name: plantToUpdate.name + " (modifiée)",
                description: "Description modifiée par Vitest",
                space_between: "99",
                categories: [],
                tags: [],
                sowingDates: [],
                harvestDates: [],
                plantDates: [],
                toxicPets: []
            }
        } as unknown as Request;

        const res = createMockResponse();

        // console.log("ID envoyé au update :", req.params.id);
        // console.log("BODY envoyé au update :", req.body);

        await plantController.update(req, res);

        // console.log("Status retourné :", res._status);
        // console.log("Body retourné :", res._body);

        expect(res._status).toBe(200);
        expect(res._body.name).toContain("(modifiée)");
        expect(res._body.description).toBe("Description modifiée par Vitest");
    });
});

describe("plantController.delete (plante existante)", () => {
    let plantToDelete: any;

    beforeAll(async () => {
        plantToDelete = await prisma.plant.findFirst({
            where: { slug: "tomate-allongee" }
        });

        if (!plantToDelete) {
            const plants = await prisma.plant.findMany();
            plantToDelete = plants[0];
        }

        // console.log("Plante récupérée pour DELETE :", plantToDelete);
    });

    it("doit supprimer une plante existante", async () => {
        if (!plantToDelete) {
            console.warn("Aucune plante trouvée pour delete → test ignoré");
            return;
        }

        const req = {
            params: { id: plantToDelete.id.toString() }
        } as unknown as Request;
        

        const res = createMockResponse();

        // console.log("ID envoyé au delete :", req.params.id);

        await plantController.delete(req, res);

        // console.log("Status retourné :", res._status);
        // console.log("Body retourné :", res._body);

        expect(res._status).toBe(200);
        expect(res._body.message).toMatch(/supprimée/i);

        const check = await prisma.plant.findUnique({
            where: { id: plantToDelete.id }
        });

        // console.log("Plante après suppression (doit être null) :", check);

        expect(check).toBeNull();
    });
});

