// commonService.spec.ts
import { describe, it, expect } from "vitest";
import { commonService } from "./commonService";

describe("commonService", () => {
    it("fetches localisations", async () => {
        const localisations = await commonService.getLocalisations();

        // console.log("Localisations fetched:", localisations);

        expect(localisations).toEqual([
            { id: 1, name: "intérieur", icon: "interieur-icon.png" },
            { id: 2, name: "extérieur", icon: "exterieur-icon.png" },
        ]);
    });

    it("fetches expositions", async () => {
        const expositions = await commonService.getExpositions();

        // console.log("Expositions fetched:", expositions);

        expect(expositions).toEqual([
            { id: 1, name: "Soleil", icon: "soleil-icon.png" },
            { id: 2, name: "Ombre", icon: "ombre-icon.png" },
        ]);
    });

    it("fetches pets", async () => {
        const pets = await commonService.getPets();

        // console.log("Pets fetched:", pets);

        expect(pets).toEqual([
            { id: 1, name: "Chat", icon: "chat-icon.png" },
            { id: 2, name: "Chien", icon: "chien-icon.png" },
            { id: 3, name: "Rongeur", icon: "rongeur-icon.png" },
        ]);
    });
});
