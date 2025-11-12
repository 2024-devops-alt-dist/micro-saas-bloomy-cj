import type { Plant } from "../../../plants/data/models/IPlant";

export interface Garden {
    id_garden: number;                  
    name: string;
    description?: string;
    created_at: Date; 
    id_user: number; 
    id_localisation?: number;      
    id_picture_garden?: number;   
    id_difficulty?: number;        
    id_exposition?: number;
    pets?: number[];              
    plants?: Plant[];             
}