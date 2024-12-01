/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton from ShadCN UI
import Card from "./Card";

type Product = {
  _id: string;
  name: string;
  before: number; // Original price
  price: number;
  description: string;
  countInStock: number;
  img: string;
};

const Arrivals = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  // const { toast } = useToast();
  // const [isInView, setIsInView] = useState(false);

  // const [activeProductId, setActiveProductId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://clockyexpress.vercel.app/api/products/newArrival",
          {
            withCredentials: true,
          }
        );

        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };
    fetchProducts();
  }, []);

  return (
    <section
      id="newarraival"
      className={
        products.length > 0
          ? "paddingX mx-auto py-10 mt-8 border-b-4 border-two w-full "
          : "hidden"
      }
    >
      {/* <div className="border-t-2 mx-auto border-two w-20 p-1 font-medium"></div> */}
      <h2 className="text-[#2E2E2E] text-center font-bold text-xl md:text-3xl">
        NEW ARRIVALS
      </h2>
      <div className="grid lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 md:grid-cols-3  gap-2 w-full pb-5 ">
        {loading
          ? // Display skeletons when loading
            Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="h-[350px] w-full md:w-[225px] bg-gray-200 rounded-lg"
              />
            ))
          : products.map((product, index) => (
              <Card product={product} key={product._id} />
            ))}
      </div>
    </section>
  );
};

export default Arrivals;
