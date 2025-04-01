"use client";

import { Input } from "./components/Input";
import { MagnifyingGlass, MapPin } from "@phosphor-icons/react";
import { RestaurantCard } from "./components/RestaurantCard";

export default function Home() {
  // this is just a placeholder for the restaurant card
  const restaurant = {
    name: "Pizza Express",
    rating: 4.5,
    cuisines: ["Italian", "Pizza", "Pasta", "Vegetarian"],
    address: {
      district: "EC4M",
      area: "London",
      postalCode: "EC4M7RF",
      canonicalName: "ec4m-london",
      location: {
        type: "Point",
        coordinates: [-0.103125, 51.516445],
      },
    },
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <Input
          label="Delivery Address"
          placeholder="Enter your postcode"
          startIcon={<MagnifyingGlass className="w-5 h-5" />}
          endIcon={<MapPin className="w-5 h-5" />}
          helperText="Find restaurants near you"
          fullWidth
        />
      </div>
      <div className="w-full flex items-start flex-col mt-10 p-6">
        <h1 className="font-semibold text-2xl">
          Restaurants at the postcode:{" "}
          {/* using just eats orange to keep it in theme :P */}
          <span className="text-[#ff8000]">placeholder</span>
        </h1>
        <div>
          <RestaurantCard
            restaurant={restaurant}
            onClick={() => {
              // Future modal implementation
              console.log("Open modal for", restaurant.name);
            }}
          />
        </div>
      </div>
    </div>
  );
}
