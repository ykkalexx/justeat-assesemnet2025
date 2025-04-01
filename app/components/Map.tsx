// Docs : https://react-leaflet.js.org/docs/start-installation/

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface MapProps {
  position: [number, number];
}

export const Map: React.FC<MapProps> = ({ position }) => {
  return (
    <div className="w-full h-full">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
