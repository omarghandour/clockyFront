import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../public/fonts/style.css";
import { Toaster } from "@/components/ui/toaster";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Script from "next/script";
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1361227498382033');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1361227498382033&ev=PageView&noscript=1"
          />
        </noscript>
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
