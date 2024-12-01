/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Card from "./Card";
// import { useRouter } from "next/router";

type Product = {
  _id: string;
  name: string;
  before: number;
  price: number;
  description: string;
  countInStock: number;
  img: string;
};

const Featured = () => {
  // const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://clockyexpress.vercel.app/api/products/featured",
          { withCredentials: true }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const addToCart = (product: Product) => {
    setActiveProductId(product._id);
    setTimeout(() => {
      setActiveProductId(null);
    }, 1000);

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item: any) => item._id === product._id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast({
      title: product.name,
      description: "added to cart",
      action: (
        <Link href="/cart" className="p-[10px]">
          Go to cart
        </Link>
      ),
    });
  };
  {
    /* ${
                     isInView
                       ? "motion-scale-in-[0.5] motion-translate-x-in-[-199%] motion-translate-y-in-[-17%] motion-opacity-in-[0%] motion-rotate-in-[-10deg] motion-blur-in-[5px] motion-duration-[0.00s] motion-duration-[0.70s]/translate"
                       : ""
                   } */
  }
  const toLink = (id: string) => {};
  return (
    <div ref={sectionRef} className="paddingX mx-auto my-8 py-10 px-5">
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
            : products.map((product) => (
                <Card product={product} key={product._id} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
