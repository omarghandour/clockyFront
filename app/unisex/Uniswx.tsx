/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Watch from "../../public/watch.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Card from "../components/Card";

type Product = {
  _id: string;
  name: string;
  before: number; // Original price
  price: number;
  description: string;
  countInStock: number;
  img: string;
};

const Unisex = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch products from the backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://clockyexpress.vercel.app/api/products/gender",
          {
            params: { gender: "men" },
            withCredentials: true,
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setActiveProductId(product._id);
    setTimeout(() => {
      setActiveProductId(null); // Clear the animation after 1 second
    }, 1000); // Match the transition duration (1000ms)

    // Set the active product id
    // Get the current cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if the product already exists in the cart
    const existingProduct = cart.find((item: any) => item._id === product._id);

    if (existingProduct) {
      // If the product exists, increment its quantity
      existingProduct.quantity += 1;
    } else {
      // Otherwise, add the product with an initial quantity of 1
      cart.push({ ...product, quantity: 1 });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    toast({
      title: product.name,
      description: "added to cart",
      action: <Link href="/cart">Go to cart</Link>,
    });
  };

  return (
    <div className="h-full text-white center flex-col  w-full bg-[#FCFCFC] overflow-hidden text-center pb-10">
      <div className="text-white md:text-left backgroundd md:bg-right bg-main bg-contain bg-no-repeat bg-center w-full flex flex-col justify-end md:gap-12 h-[300px] ">
        <span className="mainFont paddingX text-two text-8xl shadow-lg w-full">
          Unisex
        </span>
      </div>
      <div className="border-t-2 border-two w-20 p-1 font-medium"></div>
      <h2 className="text-[#2E2E2E] font-bold">UNISEX</h2>
      <div className="grid px-5 sm:px-20 md:px-32 xl:px-40 sm:grid-cols-2 mb-12 grid-cols-2 md:grid-cols-3 xl:grid-cols-5 md:gap-6 gap-2 media">
        {products.map((product) => (
          <Card product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default Unisex;
