import type { Garden } from "./garden/IGarden";
import type { Plant } from "./plant/IPlant";

export interface User {
    id: number;
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    picture_profil?: string;
    registration_date: string; 
    role: 'user' | 'admin';

    gardens?: Garden[];
    favoryPlants?: Plant[];
}