import mockDataPlants from "../data/mockPlants.json";

// const USE_MOCK = true;

export interface Plant {
    id: number;
    name: string;
    description: string;
    category: string;
    space_between: number;          
    toxic_for_pets: boolean;        
    temperature: string;            
    watering: string;               
    difficulty: string;       
    exposition: string;       
    main_goal: string;      
    main_picture: string;    
}

const mockApi = {
    async getAll(): Promise<Plant[]> {
        return [...mockDataPlants.plants];
    },

    async getById(id: number): Promise<Plant | null> {
        const plant = mockDataPlants.plants.find((p) => p.id === id);
        return plant || null;
    },
};

// const realApi = {
//     async getAll() { /* fetch('/api/...') */ },
//     async create() { /* fetch POST */ },
//     async delete() { /* fetch DELETE */ }
// };

// export const plantService = USE_MOCK ? mockApi : realApi;
export const plantService = mockApi;