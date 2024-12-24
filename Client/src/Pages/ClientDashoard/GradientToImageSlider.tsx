import React, { useEffect, useState } from "react";

interface Slide {
  title: string;
  description: string;
  imgSrc: string;
}

const GradientToImageSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const slides: Slide[] = [
    {
      title: "Get Jobs Done",
      description:
        "From posting to completion, manage all your projects seamlessly.",
      imgSrc: "/assets/happyclient.jpg",
    },
    {
      title: "Tailored Talent",
      description: "Hire experts with skills that match your exact needs.",
      imgSrc: "/assets/happyworker.jpg",
    },
    {
      title: "Safe & Secure Payments",
      description: "Manage payments easily and securely through the platform.",
      imgSrc: "/assets/payment-svg.svg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000); // Slide changes every 3 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [slides.length]);

  return (
    <div className="relative mx-auto h-60 w-[50rem] overflow-hidden rounded-lg shadow-lg xsMobile:w-[15rem] miniMobile:w-[18rem] mobile:w-[22rem] miniTablet:w-[20rem] tablet:w-[26rem] miniLaptop:w-[30rem] laptop:w-[33rem] desktop:w-[33rem]">
      {/* Background image */}
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={slides[currentSlide].imgSrc}
        alt={slides[currentSlide].title}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#022502] via-[#17411799] to-transparent">
        <div className="relative z-10 p-6 text-white">
          <h2 className="mb-2 text-3xl font-extrabold xsMobile:text-sm mobile:text-2xl">
            {slides[currentSlide].title}
          </h2>
          <p className="text-base">{slides[currentSlide].description}</p>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-4 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default GradientToImageSlider;
