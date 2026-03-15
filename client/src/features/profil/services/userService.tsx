import type { User } from "../../../models/IUser";
import api from "../../../services/api";

export type UserUpdatePayload = {
    firstname?: string;
    lastname?: string;
    email?: string;
    password?: string;
    picture_profil?: string;
    role?: "user" | "admin";
};


const realApi = {
    // Récupère tous les users (admin)
    async getAll(): Promise<User[]> {
        const res = await api.get("/users");
        return res.data;
    },

    async getById(id: number): Promise<User> {
        const res = await api.get(`/users/${id}`);
        return res.data;
    },

    async getMe(): Promise<User> {
        const res = await api.get("/me");
        return res.data.user;
    },

    async update(id: number, data: UserUpdatePayload): Promise<User> {
        try {
            const res = await api.patch(`/users/${id}`, data);
            return res.data;
        } catch (err: any) {
            if (err.response?.status === 401) {
                // Tentative de refresh si token expiré
                await api.post("/refresh");
                const retry = await api.put(`/users/${id}`, data);
                return retry.data;
            }
            throw err;
        }
    },

    async delete(id: number): Promise<void> {
        try {
            await api.delete(`/users/${id}`);
        } catch (err: any) {
            if (err.response?.status === 401) {
                await api.post("/refresh");
                await api.delete(`/users/${id}`);
                return;
            }
            throw err;
        }
    },
};

export const userService = realApi;