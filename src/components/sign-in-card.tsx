import { Card, CardHeader, CardTitle } from "./ui/card";

export default function SignInCard() {
  return (
    <div className="h-[80dvh]">
      <Card className="h-full flex justify-center items-center">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-xl md:text-4xl">
            Please Connect Your Wallet
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
