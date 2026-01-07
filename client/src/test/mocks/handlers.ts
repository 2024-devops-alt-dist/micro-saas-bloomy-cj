import { http, HttpResponse } from "msw";
import type { Garden } from "../../models/garden/IGarden";
import type { User } from "../../models/IUser";
import type { Plant } from "../../models/plant/IPlant";

const plantsMock: Plant[] = [
    { id: 1, name: "Monstera", slug: "monstera", description: "Plante tropicale" },
    { id: 2, name: "Ficus", slug: "ficus", description: "Plante d’intérieur" },
    { id: 3, name: "Pothos", slug: "pothos", description: "Plante facile" },
    { id: 4, name: "Sansevieria", slug: "sansevieria", description: "Plante résistante" },
    { id: 5, name: "Philodendron", slug: "philodendron", description: "Plante verte" },
];

const userMock: User = {
    id: 1,
    firstname: "Jean",
    lastname: "Marc", // si tu l’utilises encore
    email: "test@test.com",
    password: "password123",
    registration_date: new Date().toISOString(),
    role: "user",
    picture_profil: "profile.png",
};

const localisationsMock = [
    { id: 1, name: "intérieur", icon: "interieur-icon.png" },
    { id: 2, name: "extérieur", icon: "exterieur-icon.png" },
];

const expositionsMock = [
    { id: 1, name: "Soleil", icon: "soleil-icon.png" },
    { id: 2, name: "Ombre", icon: "ombre-icon.png" },
];

const petsMock = [
    { id: 1, name: "Chat", icon: "chat-icon.png" },
    { id: 2, name: "Chien", icon: "chien-icon.png" },
    { id: 3, name: "Rongeur", icon: "rongeur-icon.png" },
];

const gardensMock: Garden[] = [
    {
        id: 1,
        name: "Jardin de Jean",
        description: "Petit jardin tranquille",
        createdAt: new Date().toISOString(),
        id_user: 1,
        id_localisation: 1,
        user: userMock,
        pets: [petsMock[0], petsMock[1]],
        plants: [plantsMock[0], plantsMock[1]],
    },
    {
        id: 2,
        name: "Jardin de Marie",
        description: "Grand jardin fleuri",
        createdAt: new Date().toISOString(),
        id_user: 1,
        id_localisation: 2,
        user: userMock,
        pets: [petsMock[2]],
        plants: [plantsMock[2], plantsMock[3]],
    },
];

export const handlers = [
    // PLANTS
    http.get("api/plants", () => {
        return HttpResponse.json(plantsMock);
    }),

    http.get("api/plants/:id", ({ params }) => {
        const id = Number(params.id);
        const plant = plantsMock.find((p) => p.id === id);

        if (!plant) {
        return HttpResponse.json({ error: "Plante non trouvée" }, { status: 404 });
        }

        return HttpResponse.json(plant);
    }),

    // AUTH
    http.post("api/login", async ({ request }) => {
        const body = await request.json();

        // Vérifie que body est bien défini
        if (!body || typeof body !== "object") {
            return HttpResponse.json({ message: "Body manquant" }, { status: 400 });
        }

        const { email, password } = body as { email: string; password: string };

        console.log("Login MSW intercepté :", { email, password });

        if (email === "test@test.com" && password === "password123") {
            return HttpResponse.json(userMock);
        }
        return HttpResponse.json({ message: "Erreur serveur" }, { status: 401 });
    }),
    http.get("api/me", () => HttpResponse.json(userMock)),

    // COMMON DATA
    http.get("api/localisations", () => HttpResponse.json(localisationsMock)),
    http.get("api/expositions", () => HttpResponse.json(expositionsMock)),
    http.get("api/pets", () => HttpResponse.json(petsMock)),

    // GARDENS:
    http.get("/api/gardens", () => HttpResponse.json(gardensMock)),
    http.get("/api/gardens/me", () => HttpResponse.json([gardensMock[0]])),
    http.get("/api/gardens/:id", ({ params }) => {
        const id = Number(params.id);
        const garden = gardensMock.find(g => g.id === id);
        if (!garden) {
            return HttpResponse.json({ error: "Garden not found" }, { status: 404 });
        }
        return HttpResponse.json(garden);
    }),
    http.post("/api/gardens", async ({ request }) => {
        const body = await request.json();
        if (!body || typeof body !== "object") {
            return HttpResponse.json({ message: "Body invalide" }, { status: 400 });
        }

        const newGarden: Garden = {
            id: gardensMock.length + 1,
            name: (body as any).name || "Jardin sans nom",
            description: (body as any).description || "",
            createdAt: new Date().toISOString(),
            id_user: 1,
            id_localisation: (body as any).id_localisation,
            user: userMock,
            pets: (body as any).pets?.map((id: number) => petsMock.find(p => p.id === id)) || [],
            plants: (body as any).plants?.map((id: number) => plantsMock.find(p => p.id === id)) || [],
        };

        gardensMock.push(newGarden);

        return HttpResponse.json(newGarden);
        }),
];
