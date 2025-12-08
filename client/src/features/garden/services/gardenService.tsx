import type { Plant } from "../../../models/plant/IPlant";
import api from "../../../services/api";

export interface Garden {
    id: number;
    name: string;
    garden_img?: string;
    description: string;
    localisation: string;
    pets: boolean;
    plants?: Plant[];
    user?: {
        id: number;
        firstname?: string;
        lastname?: string;
        email?: string;
        picture_profil?: string;
    };
}

export type GardenDraft = Omit<Garden, "id">;

// NOTE: We previously had a mock implementation. Keep it commented for local dev if needed.
// const USE_MOCK = true;

const realApi = {
    async getAll(): Promise<Garden[]> {
        const res = await api.get("/gardens");
        return res.data;
    },

    async getMine(): Promise<Garden[]> {
        const res = await api.get("/gardens/me");
        return res.data;
    },

    async create(garden: Omit<Garden, "id">): Promise<Garden> {
        // Convert plants/pets arrays to arrays of ids when needed
        const payload: any = { ...garden };
        if (Array.isArray(garden.plants)) {
            payload.plants = garden.plants.map((p: any) => (typeof p === "number" ? p : p?.id)).filter(Boolean);
        }
        if (Array.isArray((garden as any).pets)) {
            payload.pets = (garden as any).pets.map((p: any) => (typeof p === "number" ? p : p?.id)).filter(Boolean);
        }

        const res = await api.post("/gardens", payload);
        return res.data;
    }
};

export const gardenService = realApi;
