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
    <div className="pl-32 py-16 bg-white">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[#1E242C]">Learning Without Limits</h3>

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
        {[1, 2, 3, 4].map((data) => (
          <div className="w-[361px] h-[500px] bg-limit-image bg-contain bg-no-repeat m-4 flex-shrink-0"></div>
        ))}
      </div>
    </div>
  );
};

export default LearningLimits;
