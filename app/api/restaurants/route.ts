// there was an issue with cors so i created this workaround
// the way it works is that it fetches the data from the just eat api
// and then it returns the data to the client
// the client then can use the data to display the restaurants

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postcode = searchParams.get("postcode");

  if (!postcode) {
    return NextResponse.json(
      { error: "Postcode is required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Return the restaurants data
    return NextResponse.json({ restaurants: data.restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return NextResponse.json(
      { error: "Failed to fetch restaurant data" },
      { status: 500 }
    );
  }
}
