import type { Garden } from "../garden/IGarden";
import type { Plant } from "../plant/IPlant";

export interface Exposition {
    id: number;
    name: string;
    icon: string;
    description: string;

    plants?: Plant[];
    gardens?: Garden[];
}