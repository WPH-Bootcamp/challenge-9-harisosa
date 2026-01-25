import { Restaurant } from "./restaurant"

export type RestaurantCollection = {
  restaurants: Restaurant[];
  message: string;
};

export type RecommendedCollection = {
  recommendations: Restaurant[];
  message:string;
}
