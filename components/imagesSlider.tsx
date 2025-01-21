import * as React from "react";

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

export function CarouselDApiDemo(images: any) {
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
  }, [api]);

  return (
    <div className="mx-auto bg-transparent">
      <Carousel
        setApi={setApi}
        className="w-full bg-transparent shadow-none center flex-col"
      >
        <CarouselContent className="rounded shadow-none bg-transparent">
          {images.images.map((src: any, index: any) => (
            <CarouselItem key={index}>
              <Card className="p-0 border-none rounded-none bg-transparent shadow-none">
                <CardContent className="flex shadow-none aspect-square bg-transparent items-center justify-center p-0 rounded-none">
                  <Image
                    src={src}
                    width={500}
                    height={500}
                    alt="product image"
                    className="transform shadow-none transition-transform duration-300 hover:scale-110"
                  />
                  {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <div className="md:flex gap-5 hidden">
          <CarouselPrevious className="bg-main text-two" />
          <CarouselNext className="bg-main text-two" />
        </div> */}
      </Carousel>
      {/* <div className="text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div> */}
    </div>
  );
}
