/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import rolex from "../../public/RolexLogo.png";
import casio from "../../public/casio.png";
import omega from "../../public/omega.png";
import Cartier from "../../public/Cartier.png";
import Seiko from "../../public/Seiko.png";
import Image from "next/image";

const brands = [
  { name: "Rolex", route: "/brands/rolex", logoUrl: rolex },
  { name: "Casio", route: "/brands/casio", logoUrl: casio },
  { name: "Omega", route: "/brands/omega", logoUrl: omega },
  { name: "Cartier", route: "/brands/cartier", logoUrl: Cartier },
  { name: "Seiko", route: "/brands/seiko", logoUrl: Seiko },
  // Add more brands here as needed
];

const Brands: React.FC = () => {
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
      className="paddingX mx-auto bg-gray-100 py-10 my-8  w-full  shadow"
    >
      <div className=" mx-auto">
        <h2 className="md:text-3xl text-xl text-main font-bold text-center mb-8">
          OUR WATCH BRANDS
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {brands.map((brand) => (
            <Link key={brand.name} href={brand.route} passHref>
              <div
                className={`cursor-pointer hover:shadow-lg transition transform hover:scale-105 flex justify-center items-center bg-white p-4 rounded-md
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
