import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import Navbar from "./components/navbar/navbar";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { AuthSessionProvider } from "@/components/providers/session-provider";

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
      <AuthSessionProvider>
        <body className="bg-background text-foreground">
          <Navbar />
          {children}
        </body>
      </AuthSessionProvider>
    </html>
  );
}
