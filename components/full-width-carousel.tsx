"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const images = [
  "/cover1.png",
  "/cover2.png",
  "/cover3.png",
  "/cover4.png",
  "/cover5.png",
  "/cover6.png",
  "/cover7.png",
];
const smallImages = [
  "/cover1.png",
  // "/cover2.png",
  // "/cover3.png",
  "/cover4.png",
  "/cover5.png",
  // "/cover6.png",
  "/cover7.png",
];

const watchDetails = [
  {
    name: "Patek Philippe",
    brand: "Nautilus",
    description:
      "Elevate your style with the timeless elegance of the Patek Philippe Olive Dial. A masterpiece of sophistication, now within your reach. Order today with nationwide delivery!",
    href: "/products/patek-philippe-nautilus-5711-1a-001",
  },
  {
    name: "ROLEX Daytona",
    brand: "Rubber",
    description:
      "Experience luxury redefined with the Rolex Daytona Gold on Rubber. Iconic design meets unparalleled craftsmanship. Order now and enjoy fast nationwide delivery!",
    href: "https://clockyeg.com/product/67a7c95ffb260bfb67b977ae",
  },
  {
    name: "AUDEMARS",
    brand: "Piguet Rubber Chronograph",
    description:
      "Elevate your style with the Audemars Piguet Chronograph Olive Green Rubber Strap. A perfect blend of luxury and functionality. Order now and enjoy fast nationwide delivery!",
    href: "",
  },
  {
    name: "AUDEMARS",
    brand: "Piguet Royal Oak Chronograph with White Dial",
    description:
      "Unleash bold sophistication with the Audemars Piguet Chronograph White Dial. Where precision meets timeless elegance. Order now with fast nationwide delivery!",
    href: "",
  },
  {
    name: "ROLEX",
    brand: "Day-Date",
    description:
      "Discover timeless sophistication with the Rolex Day-Date Arabic Dial. A symbol of prestige and elegance crafted for those who value excellence. Order now and enjoy fast nationwide delivery!",
    href: "",
  },

  {
    name: "Watch 6",
    brand: "Brand F",
    description: "Description for Watch 6",
    href: "",
  },
  {
    name: "Watch 7",
    brand: "Brand G",
    description: "Description for Watch 7",
    href: "",
  },
];

export default function FullWidthCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30,
    containScroll: "trimSnaps",
    skipSnaps: false,
    align: "center",
    dragFree: false,
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);

    // Auto-scroll functionality
    let intervalId = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0); // Reset to the first slide
      }
    }, 8000); // Change slide every 3 seconds

    // Cleanup function
    return () => {
      clearInterval(intervalId);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const displayedImages = isSmallScreen ? smallImages : images;

  return (
    <div className="relative mt-20 h-full">
      <div className="overflow-hidden " ref={emblaRef}>
        <div className="flex h-full">
          {displayedImages?.map((src, index) => (
            <div key={index} className="relative flex-[0_0_100%] group">
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                // width={1600}
                // height={undefined}
                loading="lazy"
                className="w-full md:h-full object-cover h-[250px]"
              />
              {isSmallScreen && (
                <div className=" absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-around items-start text-white pl-14 p-4">
                  <div>
                    <h1 className=" font-bold text-3xl ">
                      {watchDetails[index].name}
                    </h1>
                    <h3 className="text-2xl italic">
                      {watchDetails[index].brand}
                    </h3>
                  </div>
                  <p className="text-sm">{watchDetails[index].description}</p>
                  <Link
                    className={`bg-main p-2 text-two ${
                      watchDetails[index].href ? "flex" : "hidden"
                    }`}
                    href={`${watchDetails[index].href}`}
                  >
                    Shop Now
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Button
        className="absolute bg-main text-two border-two md:flex hidden top-1/2 left-4 transform -translate-y-1/2"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        variant="outline"
        size="icon"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        className="absolute bg-main text-two border-two md:flex hidden top-1/2 right-4 transform -translate-y-1/2"
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        variant="outline"
        size="icon"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
