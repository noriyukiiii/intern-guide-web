import { GeistSans } from "geist/font/sans";
import Navbar from "./components/navbar/navbar";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "เว็บแนะนำสถานประกอบการ",
  description: "เว็บแนะนำสถานประกอบการ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <SessionProvider>
        <body className="bg-background text-foreground flex flex-col">
          <div className="">{children}</div>
        </body>
      </SessionProvider>
    </html>
  );
}
