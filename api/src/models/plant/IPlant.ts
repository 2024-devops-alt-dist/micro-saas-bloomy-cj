export interface Plant {
    id: number;
    slug: string;
    parent_slug?: string;
    name: string;
    description: string;
    space_between?: string;
    temperature?: string;
    id_difficulty?: number;
    id_exposition?: number;
    id_watering?: number;
    id_picture_plant?: number;
    id_localisation?: number;
}