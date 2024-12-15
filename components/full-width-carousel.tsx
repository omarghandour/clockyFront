"use client";

import React, { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = ["/cover1.jpg", "/cover2.jpg", "/cover3.jpg"];

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

  return (
    <div className="relative mt-20 h-full">
      <div className="overflow-hidden " ref={emblaRef}>
        <div className="flex h-full">
          {images.map((src, index) => (
            <div key={index} className="relative flex-[0_0_100%]">
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Slide ${index + 1}`}
                // width={1600}
                // height={undefined}
                className="w-full h-full object-cover"
              />
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
