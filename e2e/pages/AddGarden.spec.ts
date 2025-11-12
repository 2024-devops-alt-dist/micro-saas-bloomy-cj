import { test, expect } from "@playwright/test";
import plantsData from "../../client/src/features/plants/data/mockPlants.json";

test("Flow complet de création de jardin jusqu’à MyGarden", async ({ page }) => {
    // Étape 0 : AddGarden
    await page.goto("/addGarden");
    await expect(page.getByText('Créez votre jardin')).toBeVisible();
    await page.getByRole('button', { name: 'Sélection manuelle' }).click();
    await expect(page).toHaveURL(/.*addGardenInfo/);

    // Étape 1 : AddGardenInfo
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(page.getByText("Le nom du jardin est obligatoire.")).toBeVisible();
    await expect(page.getByText("C’est parti !")).toBeVisible();
    await page.getByPlaceholder("Écrire ...").fill("Mon Jardin Test");
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(page).toHaveURL(/.*addGardenInfoFa/);

    // Étape 2 : AddGardenInfoFacultative
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(page.getByText("Veuillez renseigner au moins une information avant de continuer. Ou passez l'étape.")).toBeVisible();
    await page.getByPlaceholder("Décrivez votre jardin ...").fill("Description test");
    await expect(page.getByRole("button", { name: "Passer" })).toBeHidden();
    await page.getByPlaceholder("ex: Sud-Est, Nord, etc ...").fill("Sud-Est"); 
    await page.getByRole("button", { name: "Suivant" }).click();
    await expect(page).toHaveURL(/.*gardenSelectPlants/);

    // Étape 3 : GardenSelectPlants  
    // Stub plantService avec mes mocks
    await page.addInitScript((plants) => {
        // @ts-ignore
        window.plantService = { getAll: async () => plants };
    }, plantsData.plants);

    await expect(page.getByText("Choisissez vos plantes")).toBeVisible();

    // Vérifier que les plantes sont affichées
    const plantCards = page.locator(".plant-card-container");
    await expect(plantCards).toHaveCount(plantsData.plants.length);

    await plantCards.nth(0).click();

    // Page détails plante sélectionnée
    await expect(page).toHaveURL(/\/plants\/\d+/);
    const selectedPlantName = plantsData.plants[0].name;
    await expect(page.getByRole("heading", { name: selectedPlantName })).toBeVisible();
    await page.getByRole("button", { name: "Variété" }).click();

    // Attendre que la liste des variétés s’affiche
    const varietyItems = page.locator(".variety-item");
    await expect(varietyItems.count()).resolves.toBeGreaterThan(0);

    // Sélectionner la première variété dans la liste
    await varietyItems.nth(0).click();

    // Vérifier qu’on est bien sur la variété sélectionnée (le nom doit avoir changé)
    const newPlantName = plantsData.plants.find(
        p => p.id !== plantsData.plants[0].id && p.parent_slug === plantsData.plants[0].slug
    )?.name;

    await expect(page.getByRole("heading", { name: newPlantName })).toBeVisible();

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

    await plantCards.nth(5).click();

    await expect(page).toHaveURL(/\/plants\/\d+/);
    const selectedPlantName2 = plantsData.plants[5].name;
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
