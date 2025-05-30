"use client";

import { Input } from "./components/Input";
import { MagnifyingGlass, MapPin } from "@phosphor-icons/react";
import { RestaurantCard } from "./components/RestaurantCard";
import { fetchRestaurantsByPostcode } from "./service/api";
import { FilteredRestaurant } from "./types";
import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";
import Sorting from "./components/Sorting";
import Skeleton from "./components/Skeleton";

export default function Home() {
  const [postcode, setPostcode] = useState("EC4M7RF");
  const [restaurants, setRestaurants] = useState<FilteredRestaurant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<FilteredRestaurant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<"rating" | "cuisine">("rating");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [minRating, setMinRating] = useState(0);

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

  const openRestaurantModal = (restaurant: FilteredRestaurant) => {
    setSelectedRestaurant(restaurant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const getFilteredAndSortedRestaurants = () => {
    // first i filter the restaurants based on criteria
    const filtered = restaurants.filter((restaurant) => {
      // then by by minimum rating
      if (minRating > 0 && restaurant.rating < minRating) {
        return false;
      }

      // filter by cuisine if a filter is set
      if (cuisineFilter.trim() !== "") {
        const matchesCuisine = restaurant.cuisines.some((cuisine) =>
          cuisine.toLowerCase().includes(cuisineFilter.toLowerCase())
        );
        if (!matchesCuisine) {
          return false;
        }
      }

      return true;
    });

    const sorted = [...filtered];

    switch (sortBy) {
      case "rating":
        sorted.sort((a, b) =>
          sortOrder === "desc" ? b.rating - a.rating : a.rating - b.rating
        );
        break;

      case "cuisine":
        sorted.sort((a, b) => {
          const cuisineA = a.cuisines[0]?.toUpperCase() || "";
          const cuisineB = b.cuisines[0]?.toUpperCase() || "";
          return sortOrder === "desc"
            ? cuisineB.localeCompare(cuisineA)
            : cuisineA.localeCompare(cuisineB);
        });
        break;
    }

    return sorted;
  };

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

        <Sorting
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        {restaurants.length > 0 && !loading && (
          <div className="w-full mt-6 p-4 bg-white rounded-xl shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Filter Results</h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by cuisine
                </label>
                <Input
                  placeholder="e.g. Italian, Pizza..."
                  startIcon={<MagnifyingGlass className="w-4 h-4" />}
                  value={cuisineFilter}
                  onChange={(e) => setCuisineFilter(e.target.value)}
                  fullWidth
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum rating
                </label>
                <select
                  className="h-12 rounded-xl border border-gray-200 px-4 text-base"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                >
                  <option value="0">Any rating</option>
                  <option value="3">3+ stars</option>
                  <option value="4">4+ stars</option>
                  <option value="4.5">4.5+ stars</option>
                </select>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              Showing {getFilteredAndSortedRestaurants().length} of{" "}
              {restaurants.length} restaurants
            </div>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
          {getFilteredAndSortedRestaurants().map((restaurant) => (
            <RestaurantCard
              key={restaurant.name}
              restaurant={restaurant}
              onClick={() => openRestaurantModal(restaurant)}
            />
          ))}
        </div>

        {restaurants.length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-8">
            No restaurants found in this area.
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        restaurant={selectedRestaurant}
      />
    </div>
  );
}
