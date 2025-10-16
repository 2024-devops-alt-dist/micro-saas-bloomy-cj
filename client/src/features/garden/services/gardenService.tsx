import type { Plant } from "../../plants/services/plantService";
import mockDataGarden from "../data/mockGarden.json";

// const USE_MOCK = true;

export interface Garden {
    id: number;
    name: string;
    description: string;
    localisation: string;
    pets: boolean;
    plants?: Plant[];
}

const mockApi = {
    async getAll(): Promise<Garden[]> {
        const gardens = mockDataGarden.gardens;

        // On "hydrate" les IDs en objets Plant
        const allPlants = await plantService.getAll();

        const hydratedGardens = gardens.map((garden: any) => ({
            ...garden,
            plants: garden.plants
                .map((plantId: number) =>
                    allPlants.find((p) => p.id === plantId)
                )
                .filter(Boolean), // enlève les "undefined" si un ID ne correspond pas
        }));

        return hydratedGardens;
    },
    async create(garden: Omit<Garden, 'id'>): Promise<Garden> {
        return { id: Date.now(), ...garden };
    },
};

// const realApi = {
//    async getAll() { /* fetch('/api/...') */ },
//   async create() { /* fetch POST */ },
//   async delete() { /* fetch DELETE */ }
// };

// export const gardenService = USE_MOCK ? mockApi : realApi;
export const plantService = mockApi;
