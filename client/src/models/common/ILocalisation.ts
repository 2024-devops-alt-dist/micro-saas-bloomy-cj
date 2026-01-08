import type { Garden } from "../garden/IGarden";
import type { Plant } from "../plant/IPlant";

export interface Localisation {
    id: number;
    name: string;
    icon: string;

    plants?: Plant[];
    gardens?: Garden[];
}