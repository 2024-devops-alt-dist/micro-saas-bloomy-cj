import type { Garden } from "../garden/IGarden";
import type { Plant } from "../plant/IPlant";

export interface Difficulty {
    id: number;
    name: string;
    description: string;
    score: number;
    icon?: string;

    plants?: Plant[];
    gardens?: Garden[];
}