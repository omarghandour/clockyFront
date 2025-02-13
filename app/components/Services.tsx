/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import rolex from "../../public/fast-delivery-svgrepo-com.svg";
import casio from "../../public/money-bag-svgrepo-com.svg";
import omega from "../../public/money-cash-svgrepo-com.svg";
import Cartier from "../../public/medal-svgrepo-com.svg";

const brands = [
  {
    name: "FAST SHIPPING",
    route: "/brands/rolex",
    logoUrl: rolex,
    p: "Orders will be shipped to your doorstep within 2-3 days",
  },
  {
    name: "FREE RETURNS",
    route: "/brands/casio",
    logoUrl: casio,
    p: "You may return or exchange your product within 14 days of purchase if it is in its original condition.",
  },
  {
    name: "CASH ON DELIVERY",
    route: "/brands/omega",
    logoUrl: omega,
    p: "Flexible Payment Options Pay on delivery or securely with your card on our website—choose what suits you best!",
  },
  {
    name: "LOCAL WARRANTY",
    route: "/brands/cartier",
    logoUrl: Cartier,
    p: "Clocky 2-Year Warranty We guarantee our watches against manufacturing defects for 2 years. Contact us with proof of purchase for support",
  },
  // Add more brands here as needed
];

const Services: React.FC = () => {
  return (
    <section
      id="brands"
      className="paddingX mx-auto pb-2 md:py-8 mb-8 md:my-8 w-full"
    >
      <div className="transition-all mx-auto">
        <h2 className="md:text-3xl text-xl text-main font-bold text-center mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div key={brand.name} className="transition-all">
              <div className="cursor-pointer flex flex-col justify-center items-center p-4 rounded-md">
                <Image
                  src={brand.logoUrl}
                  alt={`${brand.name} logo`}
                  width={80}
                  height={48}
                  className="h-12 object-contain"
                />
                <h4 className="mt-1 text-[12px] md:text-[16px] text-main">
                  {brand.name}
                </h4>
                <p className="text-pretty hover:text-lines-3 text-center text-[10px] text-main">
                  {brand.p}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
