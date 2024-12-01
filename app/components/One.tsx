import React from "react";
import Image from "next/image";
import xx from "../../public/quote-svgrepo-com.svg";
import Big from "../../public/big.png";
import Delmondo from "../../public/delmondo.jpeg";
export const One = () => {
  return (
    <div className=" md:w-4/5 sm:h-full md:flex md:justify-around md:flex-row flex flex-col items-center justify-center mx-auto p-8">
      <div>
        {" "}
        <div>
          <Image src={Big} alt="watch" className=" w-[342px]   rounded-full" />
        </div>
        <div className="flex gap-20 justify-center">
          <button className=" shadow-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              stroke="#D4AF37"
              viewBox="0 0 24 24"
            >
              <path
                fill="#D4AF37"
                fillRule="evenodd"
                d="M11.707 4.293a1 1 0 010 1.414L6.414 11H20a1 1 0 110 2H6.414l5.293 5.293a1 1 0 01-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <button className=" shadow-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="none"
              stroke="#D4AF37"
              transform="rotate(180)"
              viewBox="0 0 24 24"
            >
              <path
                fill="#D4AF37"
                fillRule="evenodd"
                d="M11.707 4.293a1 1 0 010 1.414L6.414 11H20a1 1 0 110 2H6.414l5.293 5.293a1 1 0 01-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col gap-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#D4AF37"
            width="40"
            height="40"
            viewBox="0 0 32 32"
          >
            <path d="M9.563 8.469l-.813-1.25C3.125 11 0 15.594 0 19.375c0 3.656 2.688 5.375 4.969 5.375 2.875 0 4.906-2.438 4.906-5 0-2.156-1.375-4-3.219-4.688-.531-.188-1.031-.344-1.031-1.25 0-1.156.844-2.875 3.938-5.344zm12.406 0l-.813-1.25c-5.563 3.781-8.75 8.375-8.75 12.156 0 3.656 2.75 5.375 5.031 5.375 2.906 0 4.969-2.438 4.969-5 0-2.156-1.406-4-3.313-4.688-.531-.188-1-.344-1-1.25 0-1.156.875-2.875 3.875-5.344z"></path>
          </svg>
          <p className="font-normal text-base text-left text-[#595959]">
            They are the best watches that one acquires, <br /> also they are
            always with the latest news and <br /> trends, with a very
            comfortable price and <br />
            especially with the attention you receive, they <br /> are always
            attentive to your questions.
          </p>
        </div>
        <div className="flex flex-col my-11 gap-5">
          <h1 className="text-[#2E2E2E] font-bold text-3xl">Name</h1>
          <p className="text-[#595959] font-bold text-base line-through text-start">
            1000 L.E
          </p>
          <p className="text-two font-bold text-2xl">1921</p>
        </div>
      </div>
    </div>
  );
};
export default One;
