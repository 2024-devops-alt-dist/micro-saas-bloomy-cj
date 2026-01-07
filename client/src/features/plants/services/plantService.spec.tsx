import { plantService } from "./plantService";

describe("plantService", () => {
  it("getAll retourne une liste de plantes", async () => {
    const plants = await plantService.getAll();

    // console.log("plants getAll:", plants);

    expect(plants).toHaveLength(5);
    expect(plants[0].name).toBe("Monstera");
  });

  it("getById retourne une plante", async () => {
    const plant = await plantService.getById(3);

    // console.log("plant getById:", plant);

    expect(plant.id).toBe(3);
    expect(plant.name).toBe("Pothos");
  });
});
