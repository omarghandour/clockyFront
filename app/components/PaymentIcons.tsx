/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import rolex from "../../public/apple-pay-svgrepo-com.svg";
import casio from "../../public/mastercard-svgrepo-com.svg";
import omega from "../../public/paypal-svgrepo-com.svg";
import Cartier from "../../public/visa-svgrepo-com.svg";
import Image from "next/image";

const brands = [
  {
    name: "FAST SHIPPING",
    route: "/brands/rolex",
    logoUrl: rolex,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  {
    name: "FREE RETURNS",
    route: "/brands/casio",
    logoUrl: casio,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  {
    name: "CASH ON DELIVERY",
    route: "/brands/omega",
    logoUrl: omega,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  {
    name: "LOCAL WARRANTY",
    route: "/brands/cartier",
    logoUrl: Cartier,
    p: "Order will be shipped to your doorstep within 22-days",
  },
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
      className="paddingX mx-auto pb-5 md:py-8 mb-4 md:my-8  w-full shadow transition-all"
    >
      <div className="transition-all mx-auto">
        {/* <h2 className="md:text-3xl text-xl text-main font-bold text-center mb-8">
          OUR WATCH BRANDS
        </h2> */}
        <div className="flex gap-5 md:gap-10 center transition-all">
          {brands.map((brand) => (
            <div key={brand.name} className="transition-all">
              <div
                className={`cursor-pointer hover:shadow-lg transition-all transform hover:scale-105 flex flex-col justify-center items-center rounded-md
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
                {/* <h4 className="mt-1 text-[12px] md:text-[16px] text-main">
                  {brand.name}
                </h4>
                <p className="text-lines-2 text-center text-[10px] text-main">
                  {brand.p}
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PaymentIcons;
