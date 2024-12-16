/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import rolex from "../../public/icon1.png";
import casio from "../../public/icon2.png";
import omega from "../../public/icon3.png";
import Cartier from "../../public/icon4.png";
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

const Services: React.FC = () => {
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
      className="paddingX mx-auto pb-10 md:py-8 mb-8 md:my-8  w-full shadow transition-all"
    >
      <div className="transition-all mx-auto">
        {/* <h2 className="md:text-3xl text-xl text-main font-bold text-center mb-8">
          OUR WATCH BRANDS
        </h2> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 transition-all gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={brand.route}
              passHref
              className="transition-all"
            >
              <div
                className={`cursor-pointer hover:shadow-lg transition-all transform hover:scale-105 flex flex-col justify-center items-center  p-4 rounded-md
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
                  width={80}
                  height={48}
                  className="h-12 object-contain"
                />
                <h4 className="mt-1 text-[12px] md:text-[16px]">
                  {brand.name}
                </h4>
                <p className="text-lines-2 text-center text-[10px] text-slate-600">
                  {brand.p}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
