export interface RestaurantLocation {
  type: string;
  coordinates: [number, number];
}

interface RestaurantAddress {
  city: string;
  firstLine: string;
  postalCode: string;
  area: string;
  location: RestaurantLocation;
}

export interface Cuisine {
  name: string;
  uniqueName: string;
}

export interface FilteredRestaurant {
  name: string;
  cuisines: string[];
  rating: number;
  address: RestaurantAddress;
}

export interface RawRestaurant {
  name: string;
  cuisines: Cuisine[];
  rating: {
    starRating: number;
  };
  address: RestaurantAddress;
}
