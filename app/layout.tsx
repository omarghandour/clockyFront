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
