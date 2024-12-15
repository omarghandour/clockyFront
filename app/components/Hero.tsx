"use client";

import { useState, useEffect } from "react";

const Hero = () => {
  const [token, setToken] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array of background images
  const slides = [
    "bg-[url('/public/cover1.jpg')]", // Replace with your Shadecn classes for the first image
    "bg-[url('/public/cover2.jpg')]", // Replace with your Shadecn classes for the second image
    "bg-[url('/public/cover3.jpg')]", // Replace with your Shadecn classes for the third image
  ];

  useEffect(() => {
    // This will only run in the browser
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []); // Empty dependency array ensures it runs once on mount

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length); // Loop through slides
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [slides.length]);

  return (
    <div
      className={`text-white bg-main w-full md:gap-12 mt-20 h-[488px] md:h-[600px] ${slides[currentSlide]} transition-all duration-700 ease-in-out`}
    >
      {/* Content overlay or text */}
      <div className="flex items-center justify-center h-full">
        <h1 className="text-4xl md:text-5xl font-bold">
          Welcome to Our Slider
        </h1>
      </div>
    </div>
  );
};

export default Hero;
