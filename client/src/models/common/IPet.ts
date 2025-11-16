import type { Garden } from "../garden/IGarden";
import type { PlantHasToxicPet } from "../plant/IPlantHasToxicPet";

export interface Pet {
    id: number;
    name: string;
    icon?: string;

    plantsToxic?: PlantHasToxicPet[];
    gardens?: Garden[];
}