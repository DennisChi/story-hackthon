import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Get the last path segment from the URL
  const url = new URL(request.url);
  const pathSegments = url.pathname.split("/").filter(Boolean);
  const lastPathSegment = pathSegments[pathSegments.length - 1];
  const tokenId = Number(lastPathSegment);

  const queryResult = await sql`SELECT url FROM metadata WHERE id=${tokenId}`;

  const metadata = {
    name: `Game Plus Passport #${tokenId}`,
    description: "Game Plus Passport",
    image: queryResult.rows[0].url,
  };

  return NextResponse.json(metadata);
}
