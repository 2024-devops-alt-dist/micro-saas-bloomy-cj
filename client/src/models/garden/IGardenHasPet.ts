import type { Pet } from "../common/IPet";
import type { Garden } from "./IGarden";

export interface GardenHasPet {
    gardenId: number;
    petId: number;

    garden?: Garden;
    pet?: Pet;
}