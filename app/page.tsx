"use client";

import { Input } from "./components/Input";
import { MagnifyingGlass, MapPin } from "@phosphor-icons/react";
import { RestaurantCard } from "./components/RestaurantCard";
import { fetchRestaurantsByPostcode } from "./service/api";
import { FilteredRestaurant } from "./types";
import { useState, useEffect } from "react";
import { Button } from "./components/Button";

export default function Home() {
  const [postcode, setPostcode] = useState("EC4M7RF");
  const [restaurants, setRestaurants] = useState<FilteredRestaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    const formattedPostcode = postcode.replace(/\s+/g, "");
    console.log("Searching for restaurants in:", formattedPostcode);
    if (!formattedPostcode.trim()) {
      setError("Please enter a postcode");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log("hit");
      const data = await fetchRestaurantsByPostcode(formattedPostcode);
      console.log("data", data);
      setRestaurants(data.slice(0, 10));
    } catch (err) {
      setError(
        "Error fetching restaurants. Please check your postcode and try again."
      );
      console.error("Error fetching restaurants:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-md">
        <form onSubmit={handleSearch}>
          <Input
            label="Delivery Address"
            placeholder="Enter your postcode"
            startIcon={<MagnifyingGlass className="w-5 h-5" />}
            endIcon={<MapPin className="w-5 h-5" />}
            helperText="Find restaurants near you"
            error={error || undefined}
            value={postcode}
            onChange={(e) => setPostcode(e.target.value.toUpperCase())}
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            isLoading={loading}
            loadingText="Searching..."
            startIcon={<MagnifyingGlass className="w-5 h-5" />}
          >
            Search Restaurants
          </Button>
        </form>
      </div>

      <div className="w-full flex items-start flex-col mt-10 p-6">
        <h1 className="font-semibold text-2xl">
          Restaurants at the postcode:{" "}
          {/* using just eats orange to keep it in theme :P */}
          <span className="text-[#ff8000]">{postcode}</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.name}
              restaurant={restaurant}
              onClick={() => {
                console.log("Clicked restaurant:", restaurant.name);
                // modal implementation
              }}
            />
          ))}
        </div>

        {restaurants.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-8">
            No restaurants found in this area.
          </div>
        )}
      </div>
    </div>
  );
}
