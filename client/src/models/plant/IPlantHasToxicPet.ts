import type { Pet } from "../common/IPet";
import type { Plant } from "./IPlant";

export type NiveauToxicite = 'Faible' | 'Modéré' | 'Élevé';

export interface PlantHasToxicPet {
    plantId: number;
    petId: number;
    niveauToxicite: NiveauToxicite;

    plant?: Plant;
    pet?: Pet;
}