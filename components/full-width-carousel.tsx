"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
  "/525A0030.jpg",
  "/525A3860.jpg",
  "/525A9327.jpg",
  "/525A0174.jpg",
  "/525A9431.jpg",
];

const watchDetails = [
  {
    image: "/525A0030.jpg",
    name: "Patek Philippe",
    brand: "Nautilus",
    description:
      "Elevate your style with the timeless elegance of the Patek Philippe Olive Dial. A masterpiece of sophistication, now within your reach. Order today with nationwide delivery!",
    href: "",
  },
  {
    image: "/525A3860.jpg",
    name: "ROLEX Daytona",
    brand: "Rubber",
    description:
      "Experience luxury redefined with the Rolex Daytona Gold on Rubber. Iconic design meets unparalleled craftsmanship. Order now and enjoy fast nationwide delivery!",
    href: "https://clockyeg.com/product/67a7c95ffb260bfb67b977ae",
  },
  {
    image: "/525A9327.jpg",
    name: "Audemars Piguet",
    brand: "Royal Oak Chronograph",
    description:
      "Discover timeless elegance with the Audemars Piguet Royal Oak Chronograph. Known for its iconic design, impeccable craftsmanship, and precision, this watch is a true symbol of luxury and sophistication. Perfect for those who value both functionality and style, it’s more than a timepiece—it’s a statement. Elevate your collection with this masterpiece today.",
    href: "https://www.clockyeg.com/product/67aa1b51fb260bfb67b99967",
  },
  {
    image: "/525A3860.jpg",
    name: "Rolex DAYTONA",
    brand: "Panda",
    description:
      "Rolex Daytona Rubber – A sleek and sporty variant of the iconic Daytona, featuring a durable rubber strap for added comfort and style. With its precision chronograph function, tachymetric scale, and robust stainless steel case, it’s the perfect combination of performance, luxury, and modern design.",
    href: "https://www.clockyeg.com/product/67a5fd1ffb260bfb67b966f5",
  },
  {
    image: "/525A9327.jpg",
    name: "Audemars Piguet",
    brand: "Royal Oak",
    description:
      "Elevate your style with the Royal Oak Selfwinding Flying Tourbillon. Featuring a crisp white dial and iconic design, this masterpiece blends elegance with technical excellence. A true symbol of luxury and innovation.",
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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);

    const intervalId = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 8000);

    return () => {
      clearInterval(intervalId);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const displayedImages = isSmallScreen ? smallImages : images;

  return (
    <div className="relative mt-20 h-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {displayedImages.map((src, index) => (
            <div key={index} className="relative flex-[0_0_100%] group">
              <Image
                src={src}
                alt={`Slide ${index + 1}`}
                width={1600}
                height={100}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {isSmallScreen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-around items-start text-white pl-14 p-4">
                  <div>
                    <h1 className="font-bold text-3xl">
                      {watchDetails[index].name}
                    </h1>
                    <h3 className="text-2xl italic">
                      {watchDetails[index].brand}
                    </h3>
                  </div>
                  <p className="text-sm">{watchDetails[index].description}</p>
                  {watchDetails[index].href && (
                    <Link
                      className="bg-main p-2 text-two"
                      href={watchDetails[index].href}
                    >
                      Shop Now
                    </Link>
                  )}
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
