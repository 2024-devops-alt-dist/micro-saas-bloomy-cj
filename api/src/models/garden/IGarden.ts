export interface Garden {
    id: number;
    name: string;
    description?: string;
    created_at: string;
    id_user: number;
    id_localisation?: number;
    id_picture_garden?: number;
    id_difficulty?: number;
    id_exposition?: number;
}