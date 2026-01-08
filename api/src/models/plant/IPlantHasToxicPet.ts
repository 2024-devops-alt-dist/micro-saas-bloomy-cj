export type NiveauToxicite = 'Faible' | 'Modéré' | 'Élevé';

export interface PlantHasToxicPet {
    id_plant: number;
    id_pet: number;
    niveau_toxicite: NiveauToxicite;
}