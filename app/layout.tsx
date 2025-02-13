import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../public/fonts/style.css";
import { Toaster } from "@/components/ui/toaster";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
// import CookiesWarning from "./components/CookiesWarning";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clocky - Stylish and High-Quality Watches",
  description:
    "Discover stylish and high-quality timepieces at Clocky. Established in 2022, we offer a curated selection of timeless classics and modern designs for watch enthusiasts worldwide.",
  keywords:
    "watches, stylish watches, high-quality timepieces, Clocky, luxury watches, modern designs, classic watches",
  authors: [
    {
      name: "Black Waves",
      url: "https://blackwaveseg.com",
    },
  ],
  openGraph: {
    title: "Clocky - Stylish and High-Quality Watches",
    description:
      "Explore our collection of stylish and high-quality timepieces that elevate your everyday life.",
    url: "https://clockyeg.com",
    type: "website",
    images: [
      {
        url: "./icon.png", // Replace with a default image URL
        width: 1200,
        height: 630,
        alt: "Clocky Watches",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clocky - Stylish and High-Quality Watches",
    description:
      "Explore our collection of stylish and high-quality timepieces that elevate your everyday life.",
    images: ["./icon.png"], // Replace with a default image URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={`${inter.className}  bg-main`}>
        <Nav />
        {children}
        {/* <CookiesWarning /> */}
        <Toaster />
        <Footer />
        {/* </SidebarProvider> */}
      </body>
    </html>
  );
}
