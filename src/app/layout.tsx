import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import StoreProvider from "./store-provider";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/custom/navbar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Todo",
  description: "A todo application",
  openGraph: {
    title: "Todo",
    description: "A todo application",
    images: [
      {
        url: "/og-image.png",
        width: 415,
        height: 200,
        alt: "Open Graph Image",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${grotesk.variable} antialiased`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Toaster richColors />

            <Navbar />

            {children}
          </ThemeProvider>
        </body>
      </html>
    </StoreProvider>
  );
}
