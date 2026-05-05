import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";
import Footer from "./components/Footer";
import Providers from "./queryProvider";
import WhatsAppButton from "./components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RPH Reality - Your Gateway to Goa's Luxury Real Estate",
  description: "Discover exclusive villas, beachfront properties, and high-growth investments with RPH Reality. Expert guidance, transparent transactions, and a curated selection of premium properties await you in Goa's dynamic market.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <NavbarWrapper />
          {children}
          <Footer />
          <WhatsAppButton phoneNumber="919876543210" />
        </Providers>
      </body>
    </html>
  );
}
