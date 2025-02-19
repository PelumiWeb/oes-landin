"use client";
import Image from "next/image";
import React from "react";

type Props = {};

const LearningLimits = (props: Props) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400; // Adjust scroll distance
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className=" lg:pl-32 py-4 lg:py-16 bg-white">
      <div className="flex items-center justify-between w-full mr-4">
        <h3 className="text-[#1E242C] ml-4">Learning Without Limits</h3>

        <div className="w-[12%] flex justify-between items-center">
          <button
            className="relative w-[64px] h-[64px]"
            onClick={() => scroll("left")}>
            <Image src={"/iconLeft.svg"} alt="" fill />
          </button>
          <button
            className="relative w-[64px] h-[64px]"
            onClick={() => scroll("right")}>
            <Image src={"/iconRight.svg"} alt="" fill />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex items-center py-4 overflow-scroll scrollbar-hide w-full ">
        {[
          {
            image: "bg-learning",
            text: "Engaging and comprehensive lessons tailored for Ba...",
            header: "Classes for Basic School Students",
          },
          {
            image: "bg-learning2",
            text: "Empowering Senior Secondary School Students with ...",
            header: "Classes for Senior Secondary Students",
          },
          {
            image: "bg-learning3",
            text: "Enroll in our certification-bearing lectures tailo...",
            header: "Lectures for University Students",
          },
          {
            image: "bg-learning4",
            text: "Be the private teacher, join us to provide personalize learning experience",
            header: "Lectures for any training school(s)",
          },
        ].map((data, index) => (
          <div
            key={index}
            className={`w-[361px] h-[500px] ${data.image} bg-contain bg-no-repeat m-4 flex-shrink-0 relative`}>
            <div className="w-full h-full relative bg-learning-gradient">
              <div className="absolute bottom-4 px-4">
                <p className="font-semibold font-marope leading-[20px] text-[18px] text-white w-full">
                  {data.header}
                </p>
                <p className="text-[#EDEEF0] font-marope leading-[24px] font-semibold  text-[12px] ">
                  {data.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningLimits;
