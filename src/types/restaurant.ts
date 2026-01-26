import { MenuItem } from "./menuItem";

export interface Restaurant {
  id: number;
  name: string;
  star: number;
  place: string;
  lat: number;
  long: number;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  sampleMenus: MenuItem[];
  isFrequentlyOrdered: boolean;
  distance: number;
}


export type Coordinates = {
  lat: number;
  long: number;
};


export type RestaurantReviewUser = {
  id: number;
  name: string;
  avatar: string;
};

export type RestaurantReview = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: RestaurantReviewUser;
};

export type RestaurantDetail = {
  id: number;
  name: string;
  star: number;
  averageRating: number;
  place: string;
  coordinates: Coordinates;
  distance: number;
  logo: string;
  images: string[];
  category: string;
  totalMenus: number;
  totalReviews: number;
  menus: MenuItem[];
  reviews: RestaurantReview[];
};
