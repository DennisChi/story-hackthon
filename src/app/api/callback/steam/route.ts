import { google } from "@ai-sdk/google";
import { sql } from "@vercel/postgres";
import { generateText } from "ai";
import { NextRequest, NextResponse } from "next/server";

const getSteamUser = async (steamId: string) => {
  const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${steamId}`;
  const response = await fetch(url);
  const data = await response.json();
  const steamUser = data?.response?.players?.[0];
  return steamUser;
};

const getUserOwnedGames = async (steamId: string) => {
  const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true`;
  const response = await fetch(url);
  const data = await response.json();
  const games = data?.response?.games;

  return games;
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
  const ownedGames = await getUserOwnedGames(steamId);

  const result = await generateText({
    model: google("gemini-1.5-pro"),
    prompt: `"""
    ${JSON.stringify(steamUser)}

    ${JSON.stringify(ownedGames)}
    """
    
    Please list five tags for this user based on the above Steam user data. The output format should be a JSON array with no additional output. Just provide the JSON array directly.`,
  });
  console.log("steam result", result);
  let tags: string[] = [];
  try {
    tags = JSON.parse(result.text);
  } catch (e) {
    console.error(e);
  }

  if (steamUser) {
    await sql`UPDATE users SET steam_id=${steamId}, steam_games=${JSON.stringify(
      ownedGames
    )}, steam_tags=${JSON.stringify(tags)} WHERE wallet_address=${address}`;
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/register`);
}
