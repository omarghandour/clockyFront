import Recommended from "./components/Recomended";
import Arrivals from "./components/Arrivals";
import Featured from "./components/Featured";
import Brands from "./components/Brands";
import FullWidthCarousel from "@/components/full-width-carousel";
import { Suspense } from "react";
import Loading from "./components/Loading";
import Services from "./components/Services";
import PaymentIcons from "./components/PaymentIcons";
type Product = {
  data: {
    _id: string;
    name: string;
    before: number;
    price: number;
    description: string;
    countInStock: number;
    img: string;
  };
};
export default async function Home() {
  return (
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
  );
}
