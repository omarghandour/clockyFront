"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Traje from "../../public/last1.jpg";
import { useRouter } from "next/navigation";
type Product = {
  _id: string;
  name: string;
  before: number;
  price: number;
  description: string;
  countInStock: number;
  img: string;
};

export const Recommended = () => {
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const router = useRouter();
  const recommendedProduct: Product = {
    _id: "recommended_1",
    name: "Inspirational Watch",
    before: 5000,
    price: 4500,
    description: "The latest and modern watches of this year.",
    countInStock: 10,
    img: "/traje.png", // Assuming you use Traje image for the recommended product
  };

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
  };

  return (
    <section className="md:px-32 xl:px-40 mx-auto md:flex md:flex-row-reverse md:justify-evenly md:items-center  bg-[#FCFCFC] px-5 py-10 md:pb-24  gap-5 md:gap-20 flex flex-col sm:justify-center items-center pb-12  w-full  shadow">
      <div className="flex flex-col gap-6 text-left md:items-start items-center">
        {/* <span className="border-t-2 border-two w-20 px-1 font-medium"></span> */}
        <h3 className="text-[#2E2E2E] font-bold text-xl md:text-3xl">
          Recommended
        </h3>
        <div className="flex flex-col gap-6 text-left">
          <h1 className=" text-3xl text-[#2E2E2E] font-medium">
            The best-selling watch <br /> of 2024
          </h1>
          <p className="text-[#595959] text-base font-normal">
            Discover timeless elegance with our best-selling watch of 2024 – the
            perfect blend of style, craftsmanship, and sophistication. A piece
            loved by many, and now it’s your turn to own it.
          </p>
          <button
            onClick={() => addToCart(recommendedProduct)}
            className="py-4 w-40 px-6 shadow-xl relative md:py-3 bg-main text-two font-semibold border overflow-hidden group"
          >
            See details
            <div
              className={`group-hover:translate-x-0 absolute inset-0 text-main md:group-hover:translate-x-0 bg-two w-full h-full transform translate-x-full transition-transform md:!duration-500 !duration-1000 ease-in-out center ${
                activeProductId === recommendedProduct._id
                  ? "group-hover:translate-x-0"
                  : ""
              }`}
              onClick={() => router.push(`/product/67a4f390fb260bfb67b95a1a`)}
            >
              See details
            </div>
          </button>
        </div>
      </div>
      <div className="mt-5">
        <Image
          src={Traje}
          alt="Inspirational Watch"
          className="w-[300px] md:w-[400px]  shadow-4xl md:shadow-3xl"
        />
      </div>
    </section>
  );
};

export default Recommended;
