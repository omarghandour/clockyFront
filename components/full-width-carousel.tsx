"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const images = [
  { src: "/cover1.png", width: 2000, height: 600 },
  { src: "/cover2.png", width: 2000, height: 600 },
  { src: "/cover3.png", width: 2000, height: 600 },
  { src: "/cover4.png", width: 2000, height: 600 },
  { src: "/cover5.png", width: 2000, height: 600 },
  { src: "/cover6.png", width: 2000, height: 600 },
  { src: "/cover7.png", width: 2000, height: 600 },
];

const smallImages = [
  { src: "/525A0030.jpg", width: 800, height: 500 },
  { src: "/525A3860.jpg", width: 800, height: 500 },
  { src: "/525A9327.jpg", width: 800, height: 500 },
  { src: "/525A0174.jpg", width: 800, height: 500 },
];

const watchDetails = [
  {
    image: "/525A0030.jpg",
    name: "Patek Philippe",
    brand: "Nautilus",
    description:
      "Elevate your style with the timeless elegance of the Patek Philippe Olive Dial. A masterpiece of sophistication, now within your reach. Order today with nationwide delivery!",
    href: "https://clockyeg.com/product/67ae049247b5e6d47b97dd2a",
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
  const [loadedIndices, setLoadedIndices] = useState(new Set());
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);
  // Reset loaded indices when images change
  useEffect(() => {
    setLoadedIndices(new Set());
  }, [isSmallScreen]);

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

  // Client-side detection only
  useEffect(() => {
    setIsMounted(true);
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  if (!isMounted) return null;

  const displayedImages = isSmallScreen ? smallImages : images;

  return (
    <div className="relative mt-20 h-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {displayedImages.map((image, index) => (
            <div key={index} className="relative flex-[0_0_100%] group">
              {!loadedIndices.has(index) && (
                <div className="absolute inset-0 bg-black/50 animate-pulse" />
              )}
              <Image
                src={image.src}
                alt={`Slide ${index + 1}`}
                width={image.width}
                height={image.height}
                sizes="(max-width: 768px) 100vw, 1600px"
                className="w-full md:h-full h-[390px] object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                onLoad={() => {
                  setLoadedIndices((prev) => new Set([...prev, index]));
                }}
              />

              {isSmallScreen && (
                <div className="absolute h-[390px] inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-around items-start text-white pl-14 p-4">
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
