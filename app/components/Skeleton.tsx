import React from "react";

const Skeleton = () => {
  return (
    <div className="border-[1px] border-black/10 rounded-xl p-6 bg-white animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-5 w-5 bg-gray-200 rounded-full"></div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-6 w-16 bg-gray-200 rounded-full"></div>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="h-5 w-5 bg-gray-200 rounded-full mt-1"></div>
        <div className="space-y-2 w-full">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
