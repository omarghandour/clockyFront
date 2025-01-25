/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component
import { useParams } from "next/navigation";
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

const BrandProducts: React.FC = () => {
  const { name: brand }: any = useParams(); // Get brand name from URL

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://express.clockyeg.com/api/products/brand/${brand}`, // Replace with the brand-specific API endpoint
          {
            withCredentials: true,
          }
        );
        console.log(response);

        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [brand]);

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

  return (
    <div className="flex mt-20 py-10 flex-col items-center  w-full bg-[#FCFCFC] pt-10 p-2 mx-auto xl:w-3/4">
      <div className="border-t-2 border-two w-20 p-1 font-medium"></div>
      <h2 className="text-main font-bold text-xl md:text-2xl">
        {brand.toUpperCase()} PRODUCTS
      </h2>
      {isLoading ? (
        <div className="grid gap-4 md:gap-8 xl:gap-16 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] place-items-center w-full md:w-4/5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center p-4 gap-2 shadow-lg w-full md:w-[225px]"
            >
              <Skeleton className="w-full h-40 md:h-64" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-1/2 h-5" />
              <Skeleton className="w-1/3 h-7" />
              <Skeleton className="w-full h-10" />
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500 mt-10 text-lg">Coming soon</p>
      ) : (
        <div className="grid gap-4 md:gap-8 xl:gap-16 grid-cols-[repeat(auto-fit,minmax(150px,1fr))] place-items-center w-full md:w-4/5">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandProducts;
