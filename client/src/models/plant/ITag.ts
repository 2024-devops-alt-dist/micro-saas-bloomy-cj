import type { Plant } from "./IPlant";

export interface Tag {
    id: number;
    name: string;

    plants?: Plant[];
}
