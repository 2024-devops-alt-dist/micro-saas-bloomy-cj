import type { User } from "./IUser";
import type { Plant } from "./plant/IPlant";

export interface UserHasFavory {
    userId: number;
    plantId: number;

    user?: User;
    plant?: Plant;
}