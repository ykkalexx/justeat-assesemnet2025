"use client";

import { Input } from "./components/Input";
import { MagnifyingGlass, MapPin } from "@phosphor-icons/react";
import { RestaurantCard } from "./components/RestaurantCard";
import { fetchRestaurantsByPostcode } from "./service/api";
import { FilteredRestaurant } from "./types";
import { useState, useEffect } from "react";
import { Button } from "./components/Button";
import { Modal } from "./components/Modal";
import { CaretDown } from "@phosphor-icons/react";
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

  const sortRestaurants = (): FilteredRestaurant[] => {
    const sorted = [...restaurants];

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

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
          {sortRestaurants().map((restaurant) => (
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
