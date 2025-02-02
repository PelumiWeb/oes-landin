"use client";
import Image from "next/image";
import React from "react";
import CustomButton from "./CustomButton";
import { useRouter } from "next/navigation";

type Props = {};

const Header = (props: Props) => {
  const router = useRouter();
  return (
    <div className="bg-transparent flex items-center  justify-between w-full md:px-16 md:py-8 px-2">
      <div className="relative h-[60px] w-[60px] md:w-[100px] md:h-[100px]">
        <Image src={"/logosOES.svg"} fill alt="" />
      </div>

      <div className="hidden md:flex items-center justify-between w-[50%] ">
        <button onClick={() => router.push("/")}>
          <p className="text-[#272F3A] font-marope text-[16px] leading-[24px] font-semibold">
            Home
          </p>
        </button>
        <button onClick={() => router.push("/about")}>
          <p className="text-[#272F3A] font-marope text-[16px] leading-[24px] font-semibold">
            About
          </p>
        </button>
        <button onClick={() => router.push("/tutor")}>
          <p className="text-[#272F3A] font-marope text-[16px] leading-[24px] font-semibold">
            OES Tutor
          </p>
        </button>
        <button onClick={() => router.push("/contact")}>
          <p className="text-[#272F3A] font-marope text-[16px] leading-[24px] font-semibold">
            Contact Us
          </p>
        </button>
        {/* <button onClick={() => router.push("https://training.hremsoft.com/")}>
          <p className="text-[#272F3A] font-marope text-[16px] leading-[24px] font-semibold">
            Training
          </p>
        </button> */}
      </div>

      <div className="hidden md:block">
        <CustomButton
          padding="pl-4"
          title="Register Now"
          iconRight="/iconRightButtonHeader.svg"
          radius="rounded-[24px] rounded-l-[24px]"
          borderColor="border-white"
          borderWidth="border"
          width="w-[187px]"
          height="h-[50px]"
          onClick={() =>
            router.push("https://applications.oes.com.ng/OESWebApp/")
          }
          // backgrounColor="bg-red-500"
          textStyle="text-white text-center font-bold text-[16px] leading-[24px] font-manrope"
        />
      </div>
      <div className="flex md:hidden relative w-[32px] h-[32px]">
        <Image src="/hamburger.svg" alt="" fill />
      </div>
    </div>
  );
};

export default Header;
