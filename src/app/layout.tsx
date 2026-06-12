import type { Metadata, Viewport } from "next";
import "./globals.css";
import { EazoProvider } from "@eazo/sdk/react";
import { cn } from "@/utils/utils";
import { Toaster } from "@/components/ui/sonner";
import { UserSyncEffect } from "@/components/user-profile/user-sync-effect";
import { AppShell } from "@/components/layout/app-shell";

const publicOrigin =
  process.env.NEXT_PUBLIC_ORIGIN ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#fdf6f0",
};

export const metadata: Metadata = {
  metadataBase: new URL(publicOrigin),
  title: {
    default: "BabyHome",
    template: "%s | BabyHome",
  },
  description: "Track your baby's feeds, diapers, and sleep with one-tap logging and AI reassurance.",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn("min-h-svh flex flex-col font-body antialiased")}>
        <EazoProvider>
          <UserSyncEffect />
          <AppShell>{children}</AppShell>
          <Toaster />
        </EazoProvider>
      </body>
    </html>
  );
}
