import { Restaurant } from "./restaurant"

export type Recommendation = {
    recommendations : Restaurant[],
    message: string;
}