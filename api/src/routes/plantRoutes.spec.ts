// import { describe, it, beforeAll, afterAll, expect } from "vitest";
// import request from "supertest";
// import { prisma } from "../lib/prisma";
// import 'dotenv/config';
// import app from "../app";

// describe("Plant Routes (DB test)", () => {
//   let plantId: number;

//   beforeAll(async () => {
//     // --- Cleanup complet dans le bon ordre pour FK ---
//     await prisma.userHasFavory.deleteMany();
//     await prisma.gardenHasPlant.deleteMany();
//     await prisma.plantHasToxicPet.deleteMany();
//     await prisma.plantHasPlantDate.deleteMany();
//     await prisma.plantHasHarvestDate.deleteMany();
//     await prisma.plantHasSowingDate.deleteMany();
//     await prisma.plantHasTag.deleteMany();
//     await prisma.plantHasCategory.deleteMany();
//     await prisma.plant.deleteMany();

//     // --- Seed minimal ---
//     const plant = await prisma.plant.create({
//       data: {
//         slug: "test-plant",
//         name: "Test Plant",
//         description: "Plant pour test",
//         space_between: "10cm",
//         temperature: "20-25°C",
//         id_difficulty: 1,
//         id_exposition: 1,
//         id_watering: 1,
//         id_picture_plant: 1,
//         id_localisation: 1,
//       },
//     });
//     plantId = plant.id;
//   });

//   afterAll(async () => {
//     // --- Cleanup après tests ---
//     await prisma.userHasFavory.deleteMany();
//     await prisma.gardenHasPlant.deleteMany();
//     await prisma.plantHasToxicPet.deleteMany();
//     await prisma.plantHasPlantDate.deleteMany();
//     await prisma.plantHasHarvestDate.deleteMany();
//     await prisma.plantHasSowingDate.deleteMany();
//     await prisma.plantHasTag.deleteMany();
//     await prisma.plantHasCategory.deleteMany();
//     await prisma.plant.deleteMany();
//     await prisma.$disconnect();
//   });

//   it("GET /plants retourne 200 et liste de plantes", async () => {
//     const res = await request(app).get("/plants");
//     expect(res.status).toBe(200);
//     expect(res.body).toHaveLength(1);
//     expect(res.body[0].slug).toBe("tomate");
//   });

//   it("GET /plants/:id retourne 200 pour une plante existante", async () => {
//     const res = await request(app).get(`/plants/${plantId}`);
//     expect(res.status).toBe(200);
//     expect(res.body.id).toBe(plantId);
//   });

//   it("POST /plants crée une plante", async () => {
//     const res = await request(app)
//       .post("/plants")
//       .send({
//         slug: "new-plant",
//         name: "Nouvelle Plante",
//         description: "Créée via test",
//         space_between: "15cm",
//         temperature: "18-22°C",
//         id_difficulty: 1,
//         id_exposition: 1,
//         id_watering: 1,
//         id_picture_plant: 1,
//         id_localisation: 1,
//       });
//     expect(res.status).toBe(201);
//     expect(res.body.slug).toBe("new-plant");
//   });

//   it("DELETE /plants/:id supprime une plante", async () => {
//     const newPlant = await prisma.plant.findUnique({ where: { slug: "new-plant" } });
//     const res = await request(app).delete(`/plants/${newPlant!.id}`);
//     expect(res.status).toBe(200);
//     expect(res.body.message).toContain("supprimée avec succès");
//   });
// });
