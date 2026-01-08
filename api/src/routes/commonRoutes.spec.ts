import { describe, it, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";
import express, { Express } from "express";
import cookieParser from "cookie-parser";

import { router as commonRoutes } from "./commonRoutes";
import { prisma } from "../lib/prisma";

describe("Routes /common", () => {
    let app: Express;

    beforeAll(() => {
        app = express();
        app.use(cookieParser());
        app.use(express.json());
        app.use("/", commonRoutes); 
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("GET /localisations → doit retourner toutes les localisations", async () => {
        const res = await request(app).get("/localisations");
        // console.log("GET /localisations response:", res.body); 

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it("GET /expositions → doit retourner toutes les expositions", async () => {
        const res = await request(app).get("/expositions");
        // console.log("GET /expositions response:", res.body);

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    it("GET /pets → doit retourner tous les pets", async () => {
        const res = await request(app).get("/pets");
        // console.log("GET /pets response:", res.body);

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
