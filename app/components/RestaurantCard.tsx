"use client";

import React from "react";
import { Star, StarHalf, MapPin } from "@phosphor-icons/react";
import { FilteredRestaurant } from "../types";

interface RestaurantCardProps {
  restaurant: FilteredRestaurant;
  onClick?: () => void;
}

export const RestaurantCard = ({
  restaurant,
  onClick,
}: RestaurantCardProps) => {
  const { name, rating, address, cuisines } = restaurant;

  // generaing the star star rating display
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // adding filled stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          size={20}
          weight="fill"
          className="text-yellow-400"
        />
      );
    }

    // adding half star if needed
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          size={20}
          weight="fill"
          className="text-yellow-400"
        />
      );
    }

    // adding empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={20} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer border-[1px] border-black/10 rounded-xl p-6 
                 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] 
                 bg-white relative overflow-hidden"
    >
      <div
        className="absolute top-4 right-4 bg-[#ff8000] text-white px-2 py-1 
                    rounded-md text-sm font-semibold"
      >
        {rating.toFixed(1)}
      </div>
      <h1
        className="font-semibold text-xl text-gray-800 group-hover:text-[#ff8000] 
                     transition-colors mb-2"
      >
        {name}
      </h1>
      <div className="flex items-center gap-1 mb-3">{renderStars()}</div>
      <div className="flex flex-wrap gap-2 mb-4">
        {cuisines.slice(0, 3).map((cuisine, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full 
                       text-xs font-medium"
          >
            {cuisine}
          </span>
        ))}
        {cuisines.length > 3 && (
          <span className="text-xs text-gray-500 font-medium px-2 py-1">
            +{cuisines.length - 3} more
          </span>
        )}
      </div>
      <div className="flex items-start gap-2 text-gray-500">
        <MapPin size={20} className="mt-0.5 flex-shrink-0" />
        <div className="text-sm">
          <p>{address.city}</p>
          <p>{address.firstLine}</p>
          <p>{address.postalCode}</p>
        </div>
      </div>
    </div>
  );
};
