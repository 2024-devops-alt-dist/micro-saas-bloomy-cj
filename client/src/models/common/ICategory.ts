import type { Plant } from "../plant/IPlant";

export interface Category {
    id: number;
    name: string;
    icon?: string;

    plants?: Plant[];
}