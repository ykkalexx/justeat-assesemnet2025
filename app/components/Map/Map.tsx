/**
 * Using this component in order to fix the issue with the "window is not defined"
 * the issue has to do with SSR so this elimites the need to perform SSR
 * i found the fix following this article
 * https://medium.com/@tomisinabiodun/displaying-a-leaflet-map-in-nextjs-85f86fccc10c
 */

"use client";

import dynamic from "next/dynamic";

interface MapProps {
  position: [number, number];
}

// creating a dynamic component that only loads on the client side
const MapClient = dynamic(
  () => import("./MapClient").then((mod) => mod.MapClient),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
        Loading map...
      </div>
    ),
  }
);

export const Map: React.FC<MapProps> = ({ position }) => {
  return <MapClient position={position} />;
};
