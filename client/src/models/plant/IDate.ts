import type { Plant } from "./IPlant";

export interface HarvestDate {
    id: number;
    start_month: number;
    end_month: number;

    plants?: Plant[];
}

export interface PlantDate {
    id: number;
    start_month: number;
    end_month: number;

    plants?: Plant[];
}

export interface SowingDate {
    id: number;
    start_month: number;
    end_month: number;

    plants?: Plant[];
}