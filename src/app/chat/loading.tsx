import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="h-[80dvh]">
      <Card className="h-full flex justify-center items-center">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-xl md:text-4xl">
            <div className="animate-pulse">Loading...</div>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
