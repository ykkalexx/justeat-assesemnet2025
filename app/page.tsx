"use client";

import { Input } from "./components/Input";
import { MagnifyingGlass, MapPin } from "@phosphor-icons/react";

export default function Home() {
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
    </div>
  );
}
