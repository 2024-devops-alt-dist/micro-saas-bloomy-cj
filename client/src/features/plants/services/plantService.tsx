import type { Plant } from "../../../models/plant/IPlant";
// import mockDataPlants from "../data/mockPlants.json";

// const USE_MOCK = false; 

const API_URL = import.meta.env.VITE_API_URL + "/plants";

/* REAL API */

const realApi = {
    async getAll(): Promise<Plant[]> {
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error("Erreur lors de la récupération des plantes");

        return (await res.json()) as Plant[];
    },

    async getById(id: number): Promise<Plant> {
        const res = await fetch(`${API_URL}/${id}`);

        if (!res.ok) throw new Error(`Erreur lors de la récupération de la plante ${id}`);

        return (await res.json()) as Plant;
    },

    // async create(data: Partial<Plant>): Promise<Plant> {
    //     const res = await fetch(API_URL, {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(data),
    //     });

    //     if (!res.ok) throw new Error("Erreur lors de la création de la plante");

    //     return (await res.json()) as Plant;
    // },

    // async update(id: number, data: Partial<Plant>): Promise<Plant> {
    //     const res = await fetch(`${API_URL}/${id}`, {
    //         method: "PUT",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify(data),
    //     });

    //     if (!res.ok) throw new Error(`Erreur lors de la mise à jour de la plante ${id}`);

    //     return (await res.json()) as Plant;
    // },

    // async delete(id: number): Promise<{ message: string }> {
    //     const res = await fetch(`${API_URL}/${id}`, {
    //         method: "DELETE",
    //     });

    //     if (!res.ok) throw new Error(`Erreur lors de la suppression de la plante ${id}`);

    //     return (await res.json()) as { message: string };
    // },
};

/* MOCK API */

// const mockApi = {
//     async getAll(): Promise<Plant[]> {
//         return [...mockDataPlants.plants] as Plant[];
//     },

//     async getById(id: number): Promise<Plant | null> {
//         const plant = mockDataPlants.plants.find((p) => p.id === id);
//         return (plant as Plant) || null;
//     },
// };

/* -------------------------------- EXPORT FINAL -------------------------------- */

export const plantService = realApi;
// export const plantService = USE_MOCK ? mockApi : realApi;
