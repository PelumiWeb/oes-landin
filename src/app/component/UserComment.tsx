"use client";
import Image from "next/image";
import React from "react";

type Props = {};

const UserComment = (props: Props) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = React.useState(0);
  const totalItems = 4; // Total number of slides

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.clientWidth; // Scroll by 100% width

      if (direction === "left" && scrollIndex > 0) {
        setScrollIndex(scrollIndex - 1);
        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else if (direction === "right" && scrollIndex < totalItems - 1) {
        setScrollIndex(scrollIndex + 1);
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };
  return (
    <div className="px-32 py-16 bg-[#FAFAFA]">
      <h3 className="text-[#1E242C] py-4 ">What our users say</h3>
      <div className="flex items-start ">
        <div className="w-[600px] h-[400px] bg-[#1E242C] rounded-[20px] px-8 py-4">
          <div
            ref={scrollRef}
            className="flex items-start justify-start overflow-scroll w-full h-full scroll-smooth scrollbar-hide snap-x snap-mandatory">
            {[1, 2, 4, 5].map((data, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center w-full flex-shrink-0 snap-center">
                <div className="flex items-center justify-between w-[50%] f">
                  <p className="font-marope font-semibold text-[20px] leading-[30px] text-white">
                    Fredrick Ebuka
                  </p>
                  <div className="w-[5px] h-[5px] rounded-full bg-white" />
                  <p className="font-marope font-semibold text-[16px] leading-[24px] text-[#AAB1BA]">
                    Student
                  </p>
                </div>
                <div className="w-[90%] mt-8">
                  <p className="font-marope text-[30px] text-center leading-[48px] font-medium text-white">
                    “OES has been a game-changer for my studies. The Resources
                    are top-notch and the updates keep me on Track.”
                  </p>
                </div>
                <div className="w-[20%] flex justify-between items-center mt-4">
                  <button
                    className={`relative w-[64px] h-[64px] ${
                      scrollIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => scroll("left")}>
                    <Image src={"/iconLeft.svg"} alt="" fill />
                  </button>
                  <button
                    className={`relative w-[64px] h-[64px] ml-2 ${
                      scrollIndex === totalItems - 1
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => scroll("right")}>
                    <Image src={"/iconRight.svg"} alt="" fill />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-[500px] h-[400px]">
          <Image src={"/Video.svg"} className="object-contain" alt="" fill />
        </div>
      </div>
    </div>
  );
};

export default UserComment;
