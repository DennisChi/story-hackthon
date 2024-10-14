"use server";

import { sql } from "@vercel/postgres";

export interface User {
  address: string;
  twitterId?: string;
  steamId?: string;
  passport?: {
    nickname: string;
    rawAvatar: string;
  };
}

export const getUser = async (address: string): Promise<User> => {
  const queryResult =
    await sql`SELECT * FROM users WHERE wallet_address = ${address}`;
  if (queryResult.rows.length === 0) {
    await sql`INSERT INTO users (wallet_address) VALUES (${address})`;
    return {
      address,
    };
  } else if (queryResult.rows.length > 1) {
    throw new Error("Unexpected number of users with address " + address);
  }
  const user = queryResult.rows[0];
  const passport =
    user.nickname && user.raw_avatar_url
      ? {
          nickname: user.nickname,
          rawAvatar: user.raw_avatar_url,
        }
      : undefined;
  return {
    address,
    twitterId: user.twitter_id,
    steamId: user.steam_id,
    passport,
  };
};
