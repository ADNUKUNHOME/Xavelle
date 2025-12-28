import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Xavelle — Modern Luxury Women’s Fashion",
    template: "%s | Xavelle",
  },
  description:
    "Xavelle is a modern luxury women’s fashion brand offering elegant silhouettes, refined fabrics, and timeless designs crafted for confident femininity.",
  keywords: [
    "Xavelle",
    "Luxury Women Fashion",
    "Designer Dresses",
    "Modern Ethnic Wear",
    "Premium Clothing Brand India",
    "Women’s Fashion Store",
  ],
  authors: [{ name: "Xavelle" }],
  creator: "Xavelle",
  publisher: "Xavelle",

  openGraph: {
    title: "Xavelle — Modern Luxury Women’s Fashion",
    description:
      "Discover timeless elegance and modern luxury with Xavelle. Designed for women who value grace, confidence, and refined style.",
    siteName: "Xavelle",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Xavelle Luxury Fashion",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Xavelle — Modern Luxury Women’s Fashion",
    description:
      "Timeless silhouettes and refined luxury for the modern woman.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  themeColor: "#111111",
  metadataBase: new URL("https://xavelle.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          bg-[#F6F5F2]
          text-neutral-900
        `}
      >
        {/* App Wrapper */}
        <div className="min-h-screen flex flex-col">
          {/* Header will go here */}

          <main className="flex-1">{children}</main>

          {/* Footer will go here */}
        </div>
      </body>
    </html>
  );
}
