import type { Plant } from "../plant/IPlant";
import type { Garden } from "./IGarden";

export interface GardenHasPlant {
    gardenId: number;
    plantId: number;

    garden?: Garden;
    plant?: Plant;
}