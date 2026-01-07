// gardenService.spec.ts
import { describe, it, expect } from "vitest";
import { gardenService } from "./gardenService";

describe("gardenService", () => {
    it("getAll retourne tous les jardins", async () => {
        const gardens = await gardenService.getAll();
        console.log("All gardens:", gardens);

        expect(gardens).toHaveLength(2);
        expect(gardens[0].name).toBe("Jardin de Jean");
    });

    it("getMine retourne les jardins de l'utilisateur", async () => {
        const myGardens = await gardenService.getMine();
        console.log("My gardens:", myGardens);

        expect(myGardens).toHaveLength(1);
        expect(myGardens[0].name).toBe("Jardin de Jean");
    });

    it("getById retourne un jardin spécifique", async () => {
        const garden = await gardenService.getById(2);
        console.log("Garden by ID:", garden);

        expect(garden.id).toBe(2);
        expect(garden.name).toBe("Jardin de Marie");
    });

    it("create ajoute un nouveau jardin", async () => {
        const newGarden = await gardenService.create({
            name: "Jardin test",
            id_localisation: 1,
            pets: [1] as any,
            plants: [1, 2] as any,
        });
        
        console.log("New garden created:", newGarden);

        expect(newGarden.id).toBeGreaterThan(0);
        expect(newGarden.name).toBe("Jardin test");
    });
});
