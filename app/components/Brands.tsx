/* eslint-disable react-hooks/exhaustive-deps */
"use client";
/* eslint-disable @next/next/no-img-element */

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import rolex from "../../public/Rolex_Logo_0.svg";
import casio from "../../public/Patek Philippe_iddB3vNFWv_0.svg";
import Cartier from "../../public/Cartier_idLzbI2ywI_0.svg";
import hublot from "../../public/hublot-logo-upd.svg";
import Seiko from "../../public/TISSOT_idAinKNK5p_1.svg";
import audimars from "../../public/idBCHFJ8Yl_1738537164622.png";
import Image from "next/image";

const brands = [
  { name: "Rolex", route: "/brands/rolex", logoUrl: rolex },
  { name: "Patek Philippe", route: "/brands/patekphilippe", logoUrl: casio },
  { name: "Cartier", route: "/brands/cartier", logoUrl: Cartier },
  { name: "Hublot", route: "/brands/hublot", logoUrl: hublot },
  { name: "Tissot", route: "/brands/tissot", logoUrl: Seiko },
  {
    name: "Audemars Piguet",
    route: "/brands/audemarspiguet",
    logoUrl: audimars,
  },
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
      className="paddingX mx-auto bg-gray-100 py-10 mb-8  w-full  shadow"
    >
      <div className=" mx-auto">
        <h2 className="md:text-3xl text-xl text-main font-bold text-center mb-8">
          OUR WATCH BRANDS
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
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
