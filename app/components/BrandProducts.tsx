/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component
import { useParams } from "next/navigation";

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
          `https://clockyexpress.vercel.app/api/products/brand/${brand}`, // Replace with the brand-specific API endpoint
          {
            withCredentials: true,
          }
        );
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
    <div className="flex mt-24 py-10 flex-col items-center h-[100dvh] w-full bg-[#FCFCFC] pt-10 p-2 mx-auto xl:w-3/4">
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
            <div
              key={product._id}
              className="mt-4 md:mt-6 border-solid border-2 border-[#F0F0F0] flex flex-col items-center pb-8 gap-2 shadow-lg transition-transform duration-300 transform md:hover:scale-105 w-full md:w-[225px]"
            >
              <Link
                href={`/product/${product._id}`}
                className="flex w-full flex-col gap-2 justify-between h-full"
              >
                <img
                  src={product.img}
                  loading="lazy"
                  alt={product.name}
                  className="w-full object-cover h-40 md:h-64"
                />
                <div className="text-center">
                  <h1 className="text-main font-bold text-lg md:text-xl truncate w-full">
                    {product.name}
                  </h1>
                  <p className="text-[#595959] text-sm line-through">
                    {product.before} L.E
                  </p>
                  <p className="text-two font-bold text-xl md:text-2xl">
                    {product.price} L.E
                  </p>
                </div>
              </Link>
              <button
                onClick={() => addToCart(product)}
                className="relative h-10 flex items-center justify-center px-4 py-2 bg-main text-white font-semibold border overflow-hidden group"
              >
                <div
                  className={`absolute center inset-0 group-hover:translate-x-0 bg-two w-full h-full transform translate-x-full transition-transform duration-500 ease-in-out ${
                    activeProductId === product._id ? "translate-x-0" : ""
                  }`}
                >
                  <span className="truncate center">ADD TO CART</span>
                </div>
                <span className="truncate">ADD TO CART</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrandProducts;
