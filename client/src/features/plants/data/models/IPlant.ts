export interface Plant {
    id_plant: number;
    slug: string;
    parent_slug?: string | null;
    name: string;
    description: string;
    space_between: string;
    temperature: string;
    id_difficulty: number;
    id_exposition: number;
    id_watering: number;
    id_picture_plant: number;
    id_localisation: number; 
}
