import { test, expect } from "@playwright/test";
import plantsData from "../../client/src/features/plants/data/mockPlants.json";

test("Flow complet de création de jardin jusqu’à MyGarden", async ({ page }) => {
    // Étape 0 : AddGarden
    await page.goto("/addGarden");
    await expect(page.getByText('Créez votre jardin')).toBeVisible();
    await page.getByRole('button', { name: 'Sélection manuelle' }).click();
    await expect(page).toHaveURL(/.*addGardenInfo/);

    // Étape 1 : AddGardenInfo
    await expect(page.getByText("C’est parti !")).toBeVisible();
    await page.getByPlaceholder("Écrire ...").fill("Mon Jardin Test");
    await page.getByRole("button", { name: "Go étape 2" }).click();
    await expect(page).toHaveURL(/.*addGardenInfoFa/);

    // Étape 2 : AddGardenInfoFacultative
    await page.getByPlaceholder("Décrivez votre jardin ...").fill("Description test");
    await page.getByPlaceholder("ex: Sud-Est, Nord, etc ...").fill("Sud-Est");
    await page.locator('input[type="radio"][value="true"]').check(); 
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(page).toHaveURL(/.*gardenSelectPlants/);

    // Étape 3 : GardenSelectPlants  
    // Stub plantService avec tes mocks
    await page.addInitScript((plants) => {
        // @ts-ignore
        window.plantService = { getAll: async () => plants };
    }, plantsData.plants);

    // Vérifier que le draft est bien affiché
    await expect(page.locator('[data-testid="draft-name"]')).toHaveText("Mon Jardin Test");

    // Vérifier que les plantes sont affichées
    const plantCards = page.locator(".plant-card-container");
    await expect(plantCards).toHaveCount(plantsData.plants.length);

    await plantCards.nth(0).click();

    await expect(page).toHaveURL(/\/plants\/\d+/);
    const selectedPlantName = plantsData.plants[0].name;
    await expect(page.getByRole("heading", { name: selectedPlantName })).toBeVisible();
    await expect(page.getByRole("button", { name: "Ajouter au jardin" })).toBeVisible();

    // Cliquer sur “Ajouter au jardin”
    await page.getByRole("button", { name: "Ajouter au jardin" }).click();  


    // Étape 4 : PanierGarden
    await expect(page).toHaveURL(/.*panierGarden/);
    await expect(page.getByText("Votre sélection pour le jardin")).toBeVisible();
    await expect(page.getByText("Mon Jardin Test")).toBeVisible();

    const plantInCart = page.locator(".garden-plant-card");
    await expect(plantInCart).toHaveCount(1);

    await page.getByRole("button", { name: "+ Ajouter une plante" }).click();
    await expect(page).toHaveURL(/.*gardenSelectPlants/);

    await plantCards.nth(1).click();

    await expect(page).toHaveURL(/\/plants\/\d+/);
    const selectedPlantName2 = plantsData.plants[1].name;
    await expect(page.getByRole("heading", { name: selectedPlantName2 })).toBeVisible();
    await expect(page.getByRole("button", { name: "Ajouter au jardin" })).toBeVisible();

    // Cliquer sur “Ajouter au jardin”
    await page.getByRole("button", { name: "Ajouter au jardin" }).click();

    await expect(page).toHaveURL(/.*panierGarden/);
    await expect(plantInCart).toHaveCount(2);

    // Étape 5 : Validation du panier
    await page.getByRole("button", { name: "Valider ma sélection" }).click();

    //  Étape 6 : GardenSuccess 
    await expect(page).toHaveURL(/.*garden-success/);
    await expect(page.getByText("Bravo, vous avez créé votre jardin !")).toBeVisible();
    await expect(page.getByText("Mon Jardin Test")).toBeVisible();

    await page.getByRole("button", { name: "Voir mes jardins" }).click();

    // Étape 7 : MyGarden 
    await expect(page).toHaveURL(/.*mes-jardins/);
    await expect(page.getByText("Mes Jardins")).toBeVisible();
    await expect(page.getByText("Mon Jardin Test")).toBeVisible();
});
