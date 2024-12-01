/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import im1 from "../public/home.png";
interface SlideData {
  id: number;
  image: string;
  title: string;
  description: string;
}

// Mock data to use as a fallback
const mockSlides: SlideData[] = [
  {
    id: 1,
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.collectorsquare.com%2Fuploads%2Fdc%2F4c%2Frolex-daytona-item-6b3786dd.png&f=1&nofb=1&ipt=0354339fd31be2a89b3b7c3351a1d75b830f4506cfba8741017091d212263fda&ipo=images",
    title: "Welcome to Our Platform",
    description: "Discover amazing features and services.",
  },
  {
    id: 2,
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.collectorsquare.com%2Fuploads%2Fdc%2F4c%2Frolex-daytona-item-6b3786dd.png&f=1&nofb=1&ipt=0354339fd31be2a89b3b7c3351a1d75b830f4506cfba8741017091d212263fda&ipo=images",
    title: "Innovative Solutions",
    description: "We provide cutting-edge technology for your needs.",
  },
  {
    id: 3,
    image:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.collectorsquare.com%2Fuploads%2Fdc%2F4c%2Frolex-daytona-item-6b3786dd.png&f=1&nofb=1&ipt=0354339fd31be2a89b3b7c3351a1d75b830f4506cfba8741017091d212263fda&ipo=images",
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
    speed: 500,
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
    <div className="w-full text-center">
      <Slider {...settings} arrows={false}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[50vh] md:h-[50vh]">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain"
            />

            <div className="absolute inset-0 flex flex-col md:justify-center justify-end md:items-start items-center md:px-8  md:py-8 pt-8 ">
              <h2 className="text-3xl md:text-4xl font-bold text-two  ">
                {slide.title}
              </h2>
              <p className="text-lg md:text-xl text-two ">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
