/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import Card from "./Card";

type Product = {
  _id: string;
  name: string;
  before: number;
  price: number;
  description: string;
  countInStock: number;
  img: string;
};
const api = "https://express.clockyeg.com/api";
let isLoading = false;
const Featured = async () => {
  let data;
  try {
    const res = await axios.get(`${api}/products/featured`, {
      withCredentials: true,
    });
    // console.log(res);

    data = res.data;
  } catch (error) {
    console.error("Failed to fetch products", error);
  }

  return (
    <div className="paddingX mx-auto my-8 py-10 px-5">
      <div className="flex flex-col items-center w-full bg-[#FCFCFC] ">
        {/* <div className=""></div> */}
        <h2 className="text-main font-bold text-xl md:text-3xl ">FEATURED</h2>
        <div className="grid lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 md:grid-cols-3  gap-2 w-full pb-5 ">
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center p-4 gap-2 shadow-lg w-full"
                >
                  <Skeleton className="w-full h-40 md:h-64" />
                  <Skeleton className="w-full h-6" />
                  <Skeleton className="w-1/2 h-5" />
                  <Skeleton className="w-1/3 h-7" />
                  <Skeleton className="w-full h-10" />
                </div>
              ))
            : data?.map((product: Product) => (
                <Card product={product} key={product._id} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
