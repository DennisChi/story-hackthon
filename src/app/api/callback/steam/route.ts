import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

const STEAM_API_KEY = "F583E5BCD7DD06C64F3894A13E7316D6";

const getSteamUser = async (steamId: string) => {
  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}`;
  console.log("url", url);
  const response = await fetch(url);
  const data = await response.json();
  const steamUser = data?.response?.players?.[0];
  return steamUser;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");
  const openidIdentity = searchParams.get("openid.identity");
  const openidIdentityParts = openidIdentity?.split("/");
  const steamId = openidIdentityParts?.[openidIdentityParts.length - 1];
  if (!steamId) {
    throw new Error("No Steam ID provided");
  }
  const steamUser = await getSteamUser(steamId);
  if (steamUser) {
    await sql`UPDATE users SET steam_id=${steamId} WHERE wallet_address=${address}`;
  }

  // TODO: get user's data

  return NextResponse.redirect("http://localhost:3000/register");
}
