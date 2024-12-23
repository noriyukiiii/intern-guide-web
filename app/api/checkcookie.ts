import { NextApiRequest, NextApiResponse } from "next";
import { decrypt } from "@/lib/session";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // อ่านคุกกี้จาก req.cookies
    const sessionCookie = req.cookies?.session;

    if (!sessionCookie) {
      return res.status(200).json({ valid: false });
    }

    // ถอดรหัสคุกกี้
    const userDetails = await decrypt(sessionCookie);

    if (!userDetails) {
      return res.status(200).json({ valid: false });
    }
    console.log(userDetails)
    // คุกกี้ถูกต้อง
    return res.status(200).json({ valid: true });
  } catch (error) {
    console.error("Error checking cookie:", error);
    return res.status(500).json({ valid: false });
  }
}