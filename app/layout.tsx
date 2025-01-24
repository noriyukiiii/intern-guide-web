import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { SessionProvider } from "@/components/providers/session-provider";
import { cn } from "@/lib/utils";
import "@uploadthing/react/styles.css";

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
    <html
      lang="en"
      className={cn(GeistSans.className, "bg-background")}
      suppressHydrationWarning
    >
      <SessionProvider>
        <body className="bg-background text-foreground flex flex-col">
          <div className="">{children}</div>
        </body>
      </SessionProvider>
    </html>
  );
}
