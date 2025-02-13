/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import one from "../../public/apple-pay-svgrepo-com.svg";
import two from "../../public/logo-en.png";
import three from "../../public/3.png";
import four from "../../public/mastercard-svgrepo-com.svg";
import five from "../../public/valu.webp";
import six from "../../public/aman.png";
import visa from "../../public/visa-svgrepo-com.svg";
import Image from "next/image";
import paymoblogo from "../../public/idgsOqghIr_1738360317906.png";

const brands = [
  {
    name: "Visa",
    route: "/brands/rolex",
    logoUrl: visa,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  {
    name: "MasterCard",
    route: "/brands/cartier",
    logoUrl: four,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  {
    name: "PayPal",
    route: "/brands/casio",
    logoUrl: two,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  {
    name: "Cash on Delivery",
    route: "/brands/omega",
    logoUrl: three,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  {
    name: "Exchange & Return",
    route: "/brands/seiko",
    logoUrl: five,
    p: "Order will be shipped to your doorstep within 22-days",
  },
  {
    name: "24/7 Support",
    route: "/brands/rolex",
    logoUrl: six,
    p: "Order will be shipped to your doorstep within 22-days",
  },
];

const PaymentIcons: React.FC = () => {
  return (
    <section
      id="payment-icons"
      className="paddingX mx-auto pb-5 md:py-8 mb-4 md:my-8 w-full"
    >
      <div className="mx-auto">
        <div className="grid grid-cols-3 lg:grid-cols-6 md:w-1/2 mx-auto">
          {brands.map((brand) => (
            <div key={brand.name} className="transition-all flex">
              <div
                className={`cursor-pointer flex flex-col justify-center items-center rounded-md mx-auto`}
              >
                <Image
                  src={brand.logoUrl}
                  alt={`${brand.name} logo`}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="w-full flex flex-col items-center justify-center mt-2">
          <div>
            <span className="text-[#3a3e3b] text-left text-[10px]">
              Powered by
            </span>
            <Image
              src={paymoblogo}
              width={100}
              height={100}
              alt="PayMob Logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentIcons;
