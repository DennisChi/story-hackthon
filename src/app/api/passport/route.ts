import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { sql } from "@vercel/postgres";

interface Body {
  nickname: string;
  address: string;
  avatar: string;
}

const hexStringToFile = (
  hexString: string,
  fileName: string,
  mimeType: string
): File => {
  const byteArray = new Uint8Array(
    hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  );
  const blob = new Blob([byteArray], { type: mimeType });
  return new File([blob], fileName, { type: mimeType });
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as Body;
  const { nickname, address, avatar } = body;

  const filename = `${nickname}_${address}.png`;
  const file = hexStringToFile(avatar, filename, "image/png");
  const blob = await put(`avatars/${filename}`, file, {
    access: "public",
  });

  await sql`UPDATE users SET raw_avatar_url=${blob.url}, nickname=${nickname} WHERE wallet_address=${address}`;

  // TODO: create pixel avatar

  return NextResponse.json({ success: true });
}
