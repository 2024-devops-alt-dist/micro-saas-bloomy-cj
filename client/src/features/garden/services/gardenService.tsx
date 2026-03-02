import type { Plant } from "../../../models/plant/IPlant";
import api from "../../../services/api";

export interface Garden {
    id: number;
    name: string;
    garden_img?: string;
    description?: string;
    id_localisation?: number;
    pets?: number[];
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

const realApi = {
    async getAll(): Promise<Garden[]> {
        const res = await api.get("/gardens");
        return res.data;
    },

    async getMine(): Promise<Garden[]> {
        const res = await api.get("/gardens/me");
        return res.data;
    },

    async create(garden: GardenDraft): Promise<Garden> {
        // On transforme plants/pets en IDs
        const payload: any = { ...garden };
        if (Array.isArray(garden.plants)) {
            payload.plants = garden.plants.map(p => (typeof p === "number" ? p : p?.id)).filter(Boolean);
        }
        if (Array.isArray(garden.pets)) {
            payload.pets = garden.pets.filter(Boolean);
        }
        try {
            const res = await api.post("/gardens", payload);
            return res.data;
        } catch (err: any) {
            // Si token expiré ou invalide, tenter un refresh automatique côté serveur
            if (err.response?.status === 401) {
                try {
                    await api.post("/refresh");
                    const retry = await api.post("/gardens", payload);
                    return retry.data;
                } catch (error) {
                    throw error;
                }
            }
            throw err;
        }
    },

    async getById(id: number): Promise<Garden> {
        const res = await api.get(`/gardens/${id}`);
        return res.data;
    }
};

export const gardenService = realApi;
