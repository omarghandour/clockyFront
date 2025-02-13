import Head from "next/head";
import Recommended from "./components/Recomended";
import Arrivals from "./components/Arrivals";
import Featured from "./components/Featured";
import Brands from "./components/Brands";
import FullWidthCarousel from "@/components/full-width-carousel";
import { Suspense } from "react";
import Loading from "./components/Loading";
import Services from "./components/Services";
import PaymentIcons from "./components/PaymentIcons";

export default async function Home() {
  return (
    <>
      <Head>
        <title>Clocky - Stylish and High-Quality Watches</title>
        <meta
          name="description"
          content="Discover stylish and high-quality watches at Clocky. Shop now for the best deals!"
        />
        <meta
          name="keywords"
          content="watches, stylish watches, high-quality watches, Clocky"
        />
      </Head>
      <main className="h-auto bg-[#FCFCFC]">
        <FullWidthCarousel />
        <Brands />
        <Suspense fallback={<Loading />}>
          <Featured />
          <Services />
        </Suspense>
        <Recommended />
        <Arrivals />
        <PaymentIcons />
      </main>
    </>
  );
}
