import { NextResponse } from "next/server";

export async function POST() {
  const headers = new Headers();

  // ลบ session cookie โดยตั้ง Max-Age เป็น 0
  headers.append("Set-Cookie", `session=; HttpOnly; Path=/; Max-Age=0;`);

  return NextResponse.json({ message: "Logged out successfully" }, { headers });
}