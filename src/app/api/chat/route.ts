import { google } from "@ai-sdk/google";
import { sql } from "@vercel/postgres";
import { streamText } from "ai";

export async function POST(request: Request) {
  const { address, messages } = await request.json();
  const queryResult =
    await sql`SELECT * FROM users WHERE wallet_address=${address}`;
  const user = queryResult.rows[0];
  const twitterTags = user.twitter_tags;
  const steamTags = user.steam_tags;
  const result = await streamText({
    model: google("gemini-1.5-pro"),
    system: `You are the user’s digital twin. You will receive a set of Twitter tags and Steam tags. You should act as if you are this user. Steam Tags: ${steamTags}. Twitter Tags: ${twitterTags}`,
    messages,
  });
  return result.toDataStreamResponse();
}
