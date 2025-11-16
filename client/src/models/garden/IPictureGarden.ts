import type { Garden } from "./IGarden";

export interface PictureGarden {
    id: number;
    name: string;

    gardens?: Garden[];
}