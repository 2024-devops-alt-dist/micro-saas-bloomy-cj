import mockDataGarden from "../data/mockGarden.json";

const USE_MOCK = true;

export interface Garden {
    id: number;
    name: string;
    description: string;
    localisation: string;
    pets: boolean;
    plants: number[];
}

const mockApi = {
    async getAll(): Promise<Garden[]> {
        return [...mockDataGarden.gardens];
    },
    async create(garden: Omit<Garden, 'id'>): Promise<Garden> {
        return { id: Date.now(), ...garden };
    },
    // async delete(id: number) {
    //     return { success: true };
    // },
};

const realApi = {
   async getAll() { /* fetch('/api/...') */ },
  async create() { /* fetch POST */ },
  async delete() { /* fetch DELETE */ }
};

export const gardenService = USE_MOCK ? mockApi : realApi;
