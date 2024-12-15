import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
interface SlideData {
  id: number;
  image: any;
  title: string;
  description: string;
}
const mockSlides: SlideData[] = [
  {
    id: 1,
    image: "/cover1.jpg",
    title: "Welcome to Our Platform",
    description: "Discover amazing features and services.",
  },
  {
    id: 2,
    image: "/cover2.jpg",
    title: "Innovative Solutions",
    description: "We provide cutting-edge technology for your needs.",
  },
  {
    id: 3,
    image: "/cover3.jpg",
    title: "Customer Satisfaction",
    description: "Our top priority is your happiness and success.",
  },
];
export function HeroSlider() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="h-[488px] md:h-[600px]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-[488px] md:h-[600px]">
        <CarouselItem className="h-full w-full">
          {mockSlides.map((slide, index) => (
            <div
              key={index}
              className={` w-full h-full xl:bg-cover md:bg-contain bg-no-repeat bg-center`}
              style={{ backgroundImage: `url(${slide?.image})` }}
            >
              n
            </div>
          ))}
        </CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
