import { getServerSession } from "next-auth";
import { getUser } from "../actions";
import PassportCard from "@/components/passport-card";
import { redirect } from "next/navigation";
import { authOptions } from "@/config/next-auth";

export default async function PassportPage() {
  const session = await getServerSession(authOptions);
  const address = session?.address;
  if (!address) {
    return <div>Please connect your wallet</div>;
  }
  const user = await getUser(address);
  if (!user.passport) {
    redirect("/register");
  }

  return <PassportCard user={user} />;
}
