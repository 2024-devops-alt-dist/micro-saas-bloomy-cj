import type { Plant } from "./IPlant";

export interface PicturePlant {
    id: number;
    name: string;

    plants?: Plant[];
}