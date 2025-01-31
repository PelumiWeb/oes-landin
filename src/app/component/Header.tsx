"use client";
import Image from "next/image";
import React from "react";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";

type Props = {};

const Header = (props: Props) => {
  const router = useRouter();
  return (
    <div className="flex items-center  justify-between w-full md:px-16 md:py-8 px-2">
      <div className="relative w-[100px] h-[100px]">
        <Image src={"/logosOES.svg"} fill alt="" />
      </div>

      <div className="hidden md:flex items-center justify-between w-[50%] ">
        <button>
          <p className="text-[#272F3A] font-marope text-[16px] leading-[24px] font-semibold">
            Home
          </p>
        </button>
        <button>
          <p className="text-[#272F3A] font-marope text-[16px] leading-[24px] font-semibold">
            About
          </p>
        </button>
        <button onClick={() => router.push("/tutor")}>
          <p className="text-[#272F3A] font-marope text-[16px] leading-[24px] font-semibold">
            OES Tutor
          </p>
        </button>
        <button>
          <p className="text-[#272F3A] font-marope text-[16px] leading-[24px] font-semibold">
            Contact Us
          </p>
        </button>
        <button>
          <p className="text-[#272F3A] font-marope text-[16px] leading-[24px] font-semibold">
            Training
          </p>
        </button>
      </div>

      <div>
        <CustomButton
          padding="pl-4"
          title="Register Now"
          iconRight="/iconRightButtonHeader.svg"
          radius="rounded-[24px] rounded-l-[24px]"
          borderColor="border-white"
          borderWidth="border"
          width="w-[187px]"
          height="h-[50px]"
          // backgrounColor="bg-red-500"
          textStyle="text-white text-center font-bold text-[16px] leading-[24px] font-manrope"
        />
      </div>
    </div>
  );
};

export default Header;
