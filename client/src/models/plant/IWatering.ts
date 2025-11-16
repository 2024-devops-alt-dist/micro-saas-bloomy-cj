import type { Plant } from "./IPlant";

export interface Watering {
    id: number;
    name: string;
    icon: string;
    description?: string;

    plants?: Plant[];
}