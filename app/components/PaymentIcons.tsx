/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useRef, useState } from "react";
import one from "../../public/apple-pay-svgrepo-com.svg";
import two from "../../public/apple-pay-svgrepo-com.svg";
import three from "../../public/3.png";
import four from "../../public/mastercard-svgrepo-com.svg";
import five from "../../public/valu.webp";
import six from "../../public/aman.png";
import visa from "../../public/visa-svgrepo-com.svg";
import Image from "next/image";
import paymoblogo from "../../public/idgsOqghIr_1738360317906.png";
const brands = [
  {
    name: "FAST SHIPPING",
    route: "/brands/rolex",
    logoUrl: visa,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  {
    name: "LOCAL WARRANTY",
    route: "/brands/cartier",
    logoUrl: four,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  {
    name: "FREE RETURNS",
    route: "/brands/casio",
    logoUrl: two,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  {
    name: "CASH ON DELIVERY",
    route: "/brands/omega",
    logoUrl: three,
    p: "Order will be shipped to your doorstep within 22-days",
  },

  {
    name: "EXCHANGE & RETURN",
    route: "/brands/seiko",
    logoUrl: five,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  {
    name: "24/7 SUPPORT",
    route: "/brands/rolex",
    logoUrl: six,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  // {
  //   name: "CUSTOMER SERVICE",
  //   route: "/brands/casio",
  //   logoUrl: seven,
  //   p: "Order will be shipped to your doorstep within 22-days",
  // },
  // {
  //   name: "RETURN POLICY",
  //   route: "/brands/omega",
  //   logoUrl: eight,
  //   p: "Order will be shipped to your doorstep within 22-days",
  // },
  // {
  //   name: "SECURE PAYMENT",
  //   route: "/brands/cartier",
  //   logoUrl: nine,
  //   p: "Order will be shipped to your doorstep within 22-days",
  // },
  // {
  //   name: "100% ORIGINAL",
  //   route: "/brands/seiko",
  //   logoUrl: ten,
  //   p: "Order will be shipped to your doorstep within 22-days",
  // },
  //   { name: "Seiko", route: "/brands/seiko", logoUrl: Seiko, p: "" },
  // Add more brands here as needed
];

const PaymentIcons: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="brands"
      ref={sectionRef}
      className="paddingX mx-auto pb-5 md:py-8 mb-4 md:my-8  w-full"
    >
      {/* <div className="w-full center flex-col">
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={200}
          className=" mb-5"
        />
        <p className="text-pretty text-center text-[13px] w-full md:w-2/5 mb-3">
          We guarantee a secure and seamless payment experience with all our
          trusted payment methods. Powered by PayMob.
        </p>
        <div className="center gap-4 mb-5">
          <span className="bg-main w-5 rounded-full h-5"></span>
          <span className="bg-two w-5 rounded-full h-5"></span>
          <span className="bg-black w-5 rounded-full h-5"></span>
        </div>
      </div> */}
      <div className=" mx-auto">
        {/* <h2 className="md:text-3xl text-xl text-main font-bold text-center mb-8">
          OUR WATCH BRANDS
        </h2> */}
        <div className="grid grid-cols-3 lg:grid-cols-6 md:w-1/2 mx-auto">
          {brands.map((brand) => (
            <div key={brand.name} className="transition-all flex">
              <div
                className={`cursor-pointer flex flex-col justify-center items-center rounded-md mx-auto
                  {//  ${
                    isInView
                    //     ? "motion-scale-in-[0.5] motion-translate-x-in-[-199%] motion-translate-y-in-[-17%] motion-opacity-in-[0%] motion-rotate-in-[-10deg] motion-blur-in-[5px] motion-duration-[0.00s] motion-duration-[0.70s]/translate"
                    //     : ""}
                  }
                  `}
              >
                <Image
                  src={brand.logoUrl}
                  alt={`${brand.name} logo`}
                  width={60}
                  height={60}
                  className=" object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-2">
          {" "}
          <div>
            <span className="text-[#3a3e3b] text-left text-[10px]">
              Powered by
            </span>
            <Image src={paymoblogo} width={100} height={100} alt="paymobLogo" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentIcons;
