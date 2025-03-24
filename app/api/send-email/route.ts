import { sendVerificationEmail } from "@/lib/mailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, verificationToken, firstname, lastname } = await req.json();

    // เรียกใช้งานฟังก์ชันส่งอีเมล
    await sendVerificationEmail(email, verificationToken, firstname, lastname);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}
