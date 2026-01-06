import { describe, it, beforeAll, afterAll, expect } from "vitest";
import { commonController } from "./commonController";
import { prisma } from "../lib/prisma";
import { Request } from "express";
import { createMockResponse } from "../test/utils/testHelpers";

describe("commonController.getAllLocalisation (DB existante)", () => {
    let existingLocalisations: any[] = [];

    beforeAll(async () => {
        existingLocalisations = await prisma.localisation.findMany();
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("doit retourner toutes les localisations avec status 200", async () => {
        const req = {} as Request;
        const res = createMockResponse();

        await commonController.getAllLocalisation(req, res);

        // console.log("[LOG] getAllLocalisation → nombre de localisations :", res._body?.length);

        expect(res._status).toBe(200);
        expect(res._body).toBeInstanceOf(Array);
        expect(res._body.length).toBe(existingLocalisations.length);

        if (existingLocalisations.length > 0) {
            expect(res._body[0].id).toBe(existingLocalisations[0].id);
        }
    });
});

describe("commonController.getAllExpositions (DB existante)", () => {
    let existingExpositions: any[] = [];

    beforeAll(async () => {
        existingExpositions = await prisma.exposition.findMany();
    });

    it("doit retourner toutes les expositions avec status 200", async () => {
        const req = {} as Request;
        const res = createMockResponse();

        await commonController.getAllExpositions(req, res);

        // console.log("[LOG] getAllExpositions → nombre d'expositions :", res._body?.length);

        expect(res._status).toBe(200);
        expect(res._body).toBeInstanceOf(Array);
        expect(res._body.length).toBe(existingExpositions.length);

        if (existingExpositions.length > 0) {
            expect(res._body[0].id).toBe(existingExpositions[0].id);
        }
    });
});

describe("commonController.getAllPets (DB existante)", () => {
    let existingPets: any[] = [];

    beforeAll(async () => {
        existingPets = await prisma.pets.findMany();
    });

    it("doit retourner tous les animaux de compagnie avec status 200", async () => {
        const req = {} as Request;
        const res = createMockResponse();

        await commonController.getAllPets(req, res);

        // console.log("[LOG] getAllPets → nombre d'animaux :", res._body?.length);

        expect(res._status).toBe(200);
        expect(res._body).toBeInstanceOf(Array);
        expect(res._body.length).toBe(existingPets.length);

        if (existingPets.length > 0) {
            expect(res._body[0].id).toBe(existingPets[0].id);
        }
    });
});
