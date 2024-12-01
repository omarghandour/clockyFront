"use client";

import * as React from "react";
import Watch from "../public/watch.png";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

export function CarouselApi() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    // Set up auto-sliding every 8 seconds
    const autoSlideInterval = setInterval(() => {
      const nextIndex =
        (api.selectedScrollSnap() + 1) % api.scrollSnapList().length;
      api.scrollTo(nextIndex);
    }, 4000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(autoSlideInterval);
  }, [api]);

  return (
    <div className="mx-auto max-w-[15rem]">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Card className="bg-transparent border-none mx-auto">
                <CardContent className="flex aspect-square items-center justify-center ">
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                  <Image src={Watch} alt="Watch" className="w-40 md:w-60" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden bg-two md:flex items-center" />
        <CarouselNext className="hidden bg-two md:flex items-center" />
      </Carousel>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
}
