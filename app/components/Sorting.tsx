import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { Button } from "./Button";

interface SortingProps {
  sortBy: "rating" | "cuisine";
  setSortBy: (sortBy: "rating" | "cuisine") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (sortOrder: "asc" | "desc") => void;
}

const Sorting: React.FC<SortingProps> = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  const [isSortingMenu, setIsSortingMenu] = useState(false);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsSortingMenu(!isSortingMenu);
        }}
      >
        <h2 className="text-xl font-light">
          Sort by:{" "}
          <span className="text-[#ff8000]">
            {sortBy === "rating" ? "Rating" : "Cuisine"}
          </span>
          {sortOrder === "desc" ? " (High to Low)" : " (Low to High)"}
        </h2>
        <CaretDown
          size={20}
          className={`transition-transform ${
            isSortingMenu ? "rotate-180" : ""
          }`}
        />
      </div>

      {isSortingMenu && (
        <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg py-2 z-10 w-56">
          <div className="px-4 py-2 text-sm font-medium text-gray-500">
            Sort By
          </div>

          <Button
            variant="ghost"
            className={` ${
              sortBy === "rating" ? "text-[#ff8000] font-semibold" : ""
            }`}
            onClick={() => {
              setSortBy("rating");
              setSortOrder(
                sortBy === "rating"
                  ? sortOrder === "desc"
                    ? "asc"
                    : "desc"
                  : "desc"
              );
              setIsSortingMenu(false);
            }}
          >
            Rating
            {sortBy === "rating" && (
              <span>{sortOrder === "desc" ? "↓" : "↑"}</span>
            )}
          </Button>

          <Button
            variant="ghost"
            className={` ${
              sortBy === "cuisine" ? "text-[#ff8000] font-semibold" : ""
            }`}
            onClick={() => {
              setSortBy("cuisine");
              setSortOrder(
                sortBy === "cuisine"
                  ? sortOrder === "desc"
                    ? "asc"
                    : "desc"
                  : "desc"
              );
              setIsSortingMenu(false);
            }}
          >
            Cuisine
            {sortBy === "cuisine" && (
              <span>{sortOrder === "desc" ? "↓" : "↑"}</span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Sorting;
