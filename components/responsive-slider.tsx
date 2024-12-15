/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import im1 from "../public/cover1.jpg";
import im2 from "../public/cover2.jpg";
import im3 from "../public/cover3.jpg";
interface SlideData {
  id: number;
  image: any;
  title: string;
  description: string;
}

// Mock data to use as a fallback
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

export function ResponsiveSliderComponent() {
  const [slides, setSlides] = useState<SlideData[]>([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        // Replace this URL with your actual API endpoint
        const response = await axios.get("https://api.example.com/slides");

        // Check if the response data is valid
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSlides(response.data);
        } else {
          console.warn("API returned invalid data. Using mock data instead.");
          setSlides(mockSlides);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
        console.warn("Using mock data due to API error.");
        setSlides(mockSlides);
      }
    };

    fetchSlides();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full text-center h-full mt-20">
      <Slider {...settings} arrows={false} className="h-full w-full">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex justify-start h-[488px] md:h-[600px] bg-cover  w-full  "
          >
            <div
              className={` w-full h-full xl:bg-cover md:bg-contain bg-no-repeat bg-center`}
              style={{ backgroundImage: `url(${slide?.image})` }}
            ></div>
            {/* <Image
              src={slide.image}
              alt={slide.title}
              // layout="fill"
              // objectFit="cover"
              className="w-full"
              priority
            /> */}

            {/* <div className="absolute inset-0 flex flex-col md:justify-center justify-end md:items-start items-center md:px-8  md:py-8 pt-8 ">
              <h2 className="text-3xl md:text-4xl font-bold text-two  ">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-two ">
                {slide.description}
              </p>
            </div> */}
          </div>
        ))}
      </Slider>
    </div>
  );
}
