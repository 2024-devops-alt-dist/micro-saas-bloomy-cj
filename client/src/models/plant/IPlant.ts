import type { Category } from "../common/ICategory";
import type { Difficulty } from "../common/IDifficulty";
import type { Exposition } from "../common/IExposition";
import type { Localisation } from "../common/ILocalisation";
import type { Garden } from "../garden/IGarden";
import type { User } from "../IUser";
import type { HarvestDate, PlantDate, SowingDate } from "./IDate";
import type { PicturePlant } from "./IPicturePlant";
import type { PlantHasToxicPet } from "./IPlantHasToxicPet";
import type { Tag } from "./ITag";
import type { Watering } from "./IWatering";

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

    difficulty?: Difficulty;
    exposition?: Exposition;
    localisation?: Localisation;
    picturePlant?: PicturePlant;
    watering?: Watering;

    sowingDates?: SowingDate[];
    harvestDates?: HarvestDate[];
    plantDates?: PlantDate[];
    
    tags?: Tag[];
    categories?: Category[];
    toxicPets?: PlantHasToxicPet[];
    gardens?: Garden[];
    favoryUsers?: User[];
}