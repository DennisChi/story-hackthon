import RegisterForm from "@/components/register-form";
import { getServerSession } from "next-auth";
import { getUser } from "../actions";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/next-auth";
import SignInCard from "@/components/sign-in-card";

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  const address = session?.address;
  if (!address) {
    return <SignInCard />;
  }
  const user = await getUser(address);
  const isTwitterConnected = !!user?.twitterId;
  const isSteamConnected = !!user?.steamId;
  if (user.passport) {
    redirect("/passport");
  }

  return (
    <RegisterForm
      twitterConnected={isTwitterConnected}
      steamConnected={isSteamConnected}
    />
  );
}
