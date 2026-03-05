import type { Garden } from "../../../models/garden/IGarden";
import api from "../../../services/api";

export type GardenDraft = {
    id?: number; 
    name: string;
    description?: string;
    id_localisation?: number;
    id_picture_garden?: number;
    id_difficulty?: number;
    id_exposition?: number;
    pets?: number[];     
    plants?: number[];  
    garden_img?: string;  
};

const realApi = {
    async getAll(): Promise<Garden[]> {
        const res = await api.get("/gardens");
        return res.data;
    },

    async getMine(): Promise<Garden[]> {
        const res = await api.get("/gardens/me");
        return res.data;
    },

    async getMineById(id: number): Promise<Garden> {
        const res = await api.get(`/gardens/me/${id}`);
        return res.data;
    },

    async create(garden: GardenDraft): Promise<Garden> {
        const payload = {
            ...garden,
            plants: garden.plants ?? [],
            pets: garden.pets ?? [],
        };
        try {
            const res = await api.post("/gardens", payload);
            return res.data;
        } catch (err: any) {
            // Si token expiré ou invalide, tenter un refresh automatique côté serveur
            if (err.response?.status === 401) {
                await api.post("/refresh");
                const retry = await api.post("/gardens/me", payload);
                return retry.data;
            }
            throw err;
        }
    },

    async getById(id: number): Promise<Garden> {
        const res = await api.get(`/gardens/${id}`);
        return res.data;
    },

    async delete(id: number): Promise<void> {
        await api.delete(`/gardens/${id}`);
    },

    async update(id: number, data: Partial<GardenDraft>): Promise<Garden> {
        const res = await api.put(`/gardens/${id}`, data);
        return res.data;
    }
};

export const gardenService = realApi;
