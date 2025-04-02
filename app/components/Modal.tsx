"use client";

import React, { useEffect, useRef } from "react";
import { X, Star, StarHalf, MapPin } from "@phosphor-icons/react";
import { FilteredRestaurant } from "../types";
import { Map } from "./Map/Map";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  restaurant: FilteredRestaurant | null;
}

export const Modal = ({ isOpen, onClose, restaurant }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !restaurant) return null;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    // using for filled stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          size={24}
          weight="fill"
          className="text-yellow-400"
        />
      );
    }

    // this for half stars
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          size={24}
          weight="fill"
          className="text-yellow-400"
        />
      );
    }

    // this for empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={24} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white p-4 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {restaurant.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={24} color="#a8a8a8" />
          </button>
        </div>
        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex">{renderStars(restaurant.rating)}</div>
              <span className="text-lg font-semibold">
                {restaurant.rating.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Cuisines</h3>
            <div className="flex flex-wrap gap-2">
              {restaurant.cuisines.map((cuisine, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {cuisine}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Address</h3>
            <div className="flex items-start gap-2 text-gray-700">
              <MapPin size={24} className="mt-0.5 flex-shrink-0" />
              <div>
                <p>{restaurant.address.firstLine}</p>
                <p>{restaurant.address.city}</p>
                <p>{restaurant.address.postalCode}</p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <div className="bg-gray-100 p-4 rounded-lg text-center">
              <div className="mt-2 h-48  rounded flex items-center justify-center">
                <Map
                  position={[
                    restaurant.address.location.coordinates[1],
                    restaurant.address.location.coordinates[0],
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button className="flex-1 bg-[#ff8000] text-white py-3 rounded-lg font-medium hover:bg-[#e67300] transition-colors">
              Fancy Button
            </button>
            <button className="flex-1 border border-[#ff8000] text-[#ff8000] py-3 rounded-lg font-medium hover:bg-orange-50 transition-colors">
              Fancy Button 2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
