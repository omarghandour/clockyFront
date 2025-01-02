import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../public/fonts/style.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CookiesWarning from "./components/CookiesWarning";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clocky",
  description:
    "At Clocky Watches, we are passionate about providing stylish and high-quality timepieces that elevate your everyday life. Established in 2022, we have been on a mission to bring both timeless classics and modern designs to wristwatch enthusiasts around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" /> */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        /> */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={`${inter.className}  bg-main`}>
        {/* <Nav /> */}
        {/* <SidebarProvider> */}
        {/* <SidebarTrigger /> */}
        <Nav />
        {children}
        {/* <CookiesWarning /> */}
        <Toaster />
        <Analytics />
        <SpeedInsights />
        <Footer />
        {/* </SidebarProvider> */}
      </body>
    </html>
  );
}
