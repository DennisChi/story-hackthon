import RegisterForm from "@/components/register-form";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { sql } from "@vercel/postgres";

interface User {
  address: string;
  twitterId?: string;
  steamId?: string;
}

const getUser = async (address?: string): Promise<User | null> => {
  if (!address) {
    return null;
  }
  const queryResult =
    await sql`SELECT * FROM users WHERE wallet_address = ${address}`;
  if (queryResult.rowCount !== 1) {
    throw new Error("Unexpected number of users with address " + address);
  }
  const user = queryResult.rows[0];
  return {
    address,
    twitterId: user.twitter_id,
    steamId: user.steam_id,
  };
};

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  const address = session?.address;
  const user = await getUser(address);
  const isTwitterConnected = !!user?.twitterId;
  const isSteamConnected = !!user?.steamId;

  return (
    <RegisterForm
      twitterConnected={isTwitterConnected}
      steamConnected={isSteamConnected}
    />
  );
}
