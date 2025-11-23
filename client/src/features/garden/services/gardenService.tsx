import type { Plant } from "../../../models/plant/IPlant";
import mockDataGarden from "../data/mockGarden.json";

// const USE_MOCK = true;

export interface Garden {
    id: number;
    name: string;
    garden_img?: string; 
    description: string;
    localisation: string;
    pets: boolean;
    plants?: Plant[];
}

export type GardenDraft = Omit<Garden, "id">;

let localGardens: Garden[] = [...mockDataGarden.gardens.map(g => ({ ...g, plants: [] }))];
// let localGardens: Garden[] = [];

const mockApi = {
    async getAll(): Promise<Garden[]> {
        return localGardens;
    },

    async create(garden: Omit<Garden, "id">): Promise<Garden> {
        const newGarden: Garden = { id: Date.now(), ...garden };
        localGardens.push(newGarden);
        return newGarden;
    },

    async clearAll() {
        localGardens = [];
    }
};

// const realApi = {
//    async getAll() { /* fetch('/api/...') */ },
//   async create() { /* fetch POST */ },
//   async delete() { /* fetch DELETE */ }
// };

// export const gardenService = USE_MOCK ? mockApi : realApi;
export const gardenService = mockApi;
