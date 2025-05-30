import { Cuisine, FilteredRestaurant, RawRestaurant } from "../types";

export const fetchRestaurantsByPostcode = async (
  postcode: string
): Promise<FilteredRestaurant[]> => {
  try {
    const response = await fetch(`/api/restaurants?postcode=${postcode}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Filter and transform the data to match the required structure
    return data.restaurants.slice(0, 10).map((restaurant: RawRestaurant) => ({
      name: restaurant.name,
      cuisines: restaurant.cuisines.map((cuisine: Cuisine) => cuisine.name),
      rating: restaurant.rating.starRating,
      address: {
        city: restaurant.address.city,
        firstLine: restaurant.address.firstLine,
        postalCode: restaurant.address.postalCode,
        location: restaurant.address.location,
      },
    }));
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
