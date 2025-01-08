import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Footer from "@/mainComponents/Footer";
import Navbar from "@/mainComponents/Navbar/Navbar";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const images = [
    { src: "/assets/1.jpg", alt: "Beautiful nature scene with trees and sunlight" },
    { src: "/assets/2.jpg", alt: "Skyline of a bustling city at dusk" },
    { src: "/assets/7.jpg", alt: "Snow-capped mountain range under a clear blue sky" },
    { src: "/assets/3.jpg", alt: "Serene mountain landscape with a winding trail" },
    { src: "/assets/4.jpg", alt: "Lush green mountains with scattered clouds" },
  ];

  useEffect(() => {
    if (isPaused) return; // Skip autoplay if paused
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length, isPaused]);

  return (
    <div>
      <Navbar/>
    <div className="">
      {/* Carousel */}
      <div className="bg-gray-100 p-2">
        <div className="max-w-xl relative overflow-hidden">
          <Carousel className="w-full h-full max-h-max">
            <CarouselContent
              className="flex items-center transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`, // Adjust based on the active index
              }}
            >
              {images.map((image, index) => (
                <CarouselItem className="min-w-full" key={index}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="rounded-lg shadow-lg object-cover h-48 md:h-64 w-full"
                    loading="lazy" // Enable lazy loading
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation Controls */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
            onClick={() => {
              setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
              setIsPaused(true); // Pause autoplay on manual interaction
            }}
          >
            &#9664;
          </button>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
            onClick={() => {
              setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
              setIsPaused(true); // Pause autoplay on manual interaction
            }}
          >
            &#9654;
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === index ? "bg-gray-800" : "bg-gray-400"
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPaused(true); // Pause autoplay on indicator click
                }}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Home;
