/* eslint-disable @next/next/no-img-element */
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from ShadCN UI
import Card from "./Card";
import { fetchNewArrivals } from "@/utils/apis";

type Product = {
  _id: string;
  name: string;
  before: number; // Original price
  price: number;
  description: string;
  countInStock: number;
  img: string;
};

const Arrivals = async () => {
  const products: Product[] = await fetchNewArrivals();

  return (
    <section
      id="newarraival"
      className={"paddingX mx-auto mt-8 md:my-8 pt-10 md:py-10 px-5  w-full "}
    >
      <h2 className="text-[#2E2E2E] text-center font-bold text-xl md:text-3xl">
        New Arrivals
      </h2>

      <div className="grid lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 md:grid-cols-3  gap-2 w-full pb-5 ">
        {products?.length === 0
          ? // Display skeletons when loading
            Array.from({ length: 5 }).map((_, index) => (
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
          : products?.map((product) => (
              <Card product={product} key={product._id} />
            ))}
      </div>
    </section>
  );
};

export default Arrivals;
