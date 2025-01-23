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
    before: number; // Original price
    price: number;
    description: string;
    countInStock: number;
    img: string;
  };
};
// const api = "https://express.clockyeg.com/api";
export default async function Home() {
  // let data;
  // try {
  //   const res = await axios.get(`${api}/products/newArrival`, {
  //     withCredentials: true,
  //   });
  //   data = res.data;
  // } catch (error) {
  //   console.error("Failed to fetch products", error);
  // }
  return (
    <main className="h-auto bg-[#FCFCFC]">
      {/* <Nav /> */}
      {/* <Hero /> */}
      {/* <ResponsiveSliderComponent /> */}
      <FullWidthCarousel />
      <Brands />
      <Suspense fallback={<Loading />}>
        <Featured />
      </Suspense>
      {/* <Products /> */}
      <Recommended />
      {/* <Products2 /> */}
      {/* <One /> */}
      <Arrivals />
      <Services />
      <PaymentIcons />
      {/* <Footer /> */}
      {/* <AppSidebar /> */}
      {/* <Payment /> */}
    </main>
  );
}
