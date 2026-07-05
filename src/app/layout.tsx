import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";

export const metadata: Metadata = {
  metadataBase: new URL("https://garagewala.app"),
  title: {
    default: "Garage Wala — One App. All Vehicle Solutions.",
    template: "%s | Garage Wala",
  },
  description:
    "On-demand roadside assistance, doorstep mechanics, battery, tyre, fuel delivery, towing and vehicle servicing — anywhere, anytime. Garage Wala reaches you in 15 minutes.",
  keywords: [
    "roadside assistance", "doorstep mechanic", "car breakdown", "towing service",
    "bike repair", "battery replacement", "flat tyre repair", "fuel delivery app",
    "garage wala", "vehicle servicing app",
  ],
  authors: [{ name: "Garage Wala Technologies Pvt. Ltd." }],
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://garagewala.app",
    siteName: "Garage Wala",
    title: "Garage Wala — One App. All Vehicle Solutions.",
    description:
      "Vehicle broke down? We'll reach you anywhere. On-demand roadside assistance in 15 minutes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garage Wala — One App. All Vehicle Solutions.",
    description: "Vehicle broke down? We'll reach you anywhere.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
