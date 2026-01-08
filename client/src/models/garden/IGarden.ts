import type { Difficulty } from "../common/IDifficulty";
import type { Exposition } from "../common/IExposition";
import type { Localisation } from "../common/ILocalisation";
import type { Pet } from "../common/IPet";
import type { User } from "../IUser";
import type { Plant } from "../plant/IPlant";
import type { PictureGarden } from "./IPictureGarden";

export interface Garden {
    id: number;
    name: string;
    description?: string;
    createdAt: string; 
    id_user: number;
    id_localisation?: number;
    id_picture_garden?: number;
    id_difficulty?: number;
    id_exposition?: number;

    user: User;
    localisation?: Localisation;
    pictureGarden?: PictureGarden;
    difficulty?: Difficulty;
    exposition?: Exposition;

    pets?: Pet[];
    plants?: Plant[];
}