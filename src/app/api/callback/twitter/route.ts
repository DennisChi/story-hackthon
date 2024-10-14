import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export interface OAuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface Tweet {
  id: string;
  text: string;
  edit_history_tweet_ids: string[];
}

export interface TwitterUser {
  id: string;
  name: string;
  username: string;
  tokens?: OAuthTokens;
  tweets?: Tweet[];
  tags?: string[];
}

const exchangeCode = async (code: string): Promise<OAuthTokens> => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    "Basic WmpkQlFXSTFaVkJWWVdScE5XVnhXVEZ2U1VRNk1UcGphUTpjaWtPcEJhLUFyWHg0LUE0NVFtY3lpYXBWWW9JU01XSVUxeUwtbEUycnlYaG5wWlFFNQ=="
  );
  myHeaders.append(
    "Cookie",
    'guest_id=v1%3A172233282857249734; guest_id_ads=v1%3A172233282857249734; guest_id_marketing=v1%3A172233282857249734; personalization_id="v1_ILnUN7LZF6fqe/iTLYjb4A=="'
  );

  const urlencoded = new URLSearchParams();
  urlencoded.append("code", code);
  urlencoded.append("grant_type", "authorization_code");
  urlencoded.append("client_id", "ZjdBQWI1ZVBVYWRpNWVxWTFvSUQ6MTpjaQ");
  urlencoded.append(
    "redirect_uri",
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback/twitter`
  );
  urlencoded.append("code_verifier", "challenge");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  const response = await fetch(
    "https://api.twitter.com/2/oauth2/token",
    requestOptions
  ).then((response) => response.json());

  return {
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresAt: Math.floor(Date.now() / 1000) + response.expires_in,
  };
};

const getTwitterUser = async (tokens: OAuthTokens): Promise<TwitterUser> => {
  const response = await fetch("https://api.twitter.com/2/users/me", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });
  const result = await response.json();
  const twitterUser: TwitterUser = result.data;
  twitterUser.tokens = tokens;
  return twitterUser;
};

const saveTwitterUser = async (address: string, user: TwitterUser) => {
  const tokens = user.tokens;
  if (!tokens) {
    throw new Error("No tokens provided");
  }
  await sql`
    UPDATE users
    SET twitter_id=${user.id}, twitter_access_token=${
    tokens.accessToken
  }, twitter_refresh_token=${tokens.refreshToken}, twitter_expires_at=${
    tokens.expiresAt
  }, tweets=${JSON.stringify(user.tweets)}, twitter_tags=${JSON.stringify(
    user.tags
  )}
    WHERE wallet_address = ${address}
  `;
};

const getLatestTweets = async (twitterId: string, tokens: OAuthTokens) => {
  const response = await fetch(
    `https://api.twitter.com/2/users/${twitterId}/tweets?max_results=100`,
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }
  );
  const result = await response.json();
  return result.data;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const address = searchParams.get("state");
  if (!code || !address) {
    throw new Error(
      `No code or address provided, code: ${code}, address: ${address}`
    );
  }

  const tokens = await exchangeCode(code);
  const twitterUser = await getTwitterUser(tokens);
  const latestTweets = await getLatestTweets(twitterUser.id, tokens);
  twitterUser.tweets = latestTweets;
  const result = await generateText({
    model: google("gemini-1.5-pro"),
    prompt: `"""
    ${JSON.stringify(twitterUser)}
    """
    
    Please list five tags for this user based on the above Twitter user data. The output format should be a JSON array with no additional output. Just provide the JSON array directly.`,
  });
  let tags: string[] = [];
  try {
    tags = JSON.parse(result.text);
  } catch (e) {
    console.error(e);
  }
  twitterUser.tags = tags;
  await saveTwitterUser(address, twitterUser);

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/register`);
}
