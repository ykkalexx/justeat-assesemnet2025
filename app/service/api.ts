import { Cuisine, FilteredRestaurant, RawRestaurant } from "../types";

export const fetchRestaurantsByPostcode = async (
  postcode: string
): Promise<FilteredRestaurant[]> => {
  try {
    const response = await fetch(
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Filter and transform the data to match the required structure
    return data.restaurants.map((restaurant: RawRestaurant) => ({
      name: restaurant.name,
      cuisines: restaurant.cuisines.map((cuisine: Cuisine) => cuisine.name),
      rating: restaurant.rating.starRating,
      address: {
        canonicalName: restaurant.address.canonicalName,
        district: restaurant.address.district,
        postalCode: restaurant.address.postalCode,
        area: restaurant.address.area,
        location: restaurant.address.location,
      },
    }));
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    throw error;
  }
};
