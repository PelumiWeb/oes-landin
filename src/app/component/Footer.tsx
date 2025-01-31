import Image from "next/image";
import React from "react";

type Props = {};

const Paragraph = (props: { bold?: boolean; text: string }) => {
  return (
    <p
      className={`my-3 md:my-1 ${
        props.bold
          ? "font-semibold leading-[27px]"
          : "font-normal leading-[24px]"
      } text-[18px]  `}>
      {props.text}
    </p>
  );
};

const Footer = (props: Props) => {
  return (
    <div className="h-full md:h-[400px] px-8  sm:px-16 md:px-32 py-8 sm:py-8 md:py-16 bg-[#FAFFFE] md:bg-footer-bg bg-bottom bg-no-repeat w-full">
      <div className="flex items-center md:items-start justify-center md:justify-between flex-col md:flex-row">
        <div className="w-full">
          <div className="flex items-center">
            <div className="relative w-[60px]  md:w-[90px] h-[60px] md:h-[90px] flex ">
              <Image src={"/logosOES.svg"} fill alt="" />
            </div>
            <p className="block md:hidden w-full text-[#017F36] leading-[24px] text-[20px] font-semibold font-inter ml-2">
              ONLINE EDUCATION SYSTEM
            </p>
          </div>

          <div className="flex items-center ">
            <Paragraph text="Phone:" bold />
            <Paragraph text="+234 811 543 1031" />
          </div>
          <div className="flex items-center ">
            <Paragraph text="Email:" bold />
            <Paragraph text="enquiries@hremsoft.com" />
          </div>
        </div>
        <div className="w-full">
          <Paragraph text="Quick Links" bold />

          <div>
            <Paragraph text="Pricing" />
            <Paragraph text="Jobs" />
            <Paragraph text="Employer" />
            <Paragraph text="Careers" />
            <Paragraph text="Contact Us" />
          </div>
        </div>
        <div className="w-full">
          <Paragraph text="Others" bold />

          <div>
            <Paragraph text="How it works" />
            <Paragraph text="Terms and condition" />
            <Paragraph text="Privacy Policy" />
            <Paragraph text="About Us" />
          </div>
        </div>
        <div className="w-full">
          <Paragraph text="About Us" bold />

          <div>
            <Paragraph text="Company milestone" />
            <Paragraph text="Web mail" />
            <Paragraph text="Board of Directors" />
            <Paragraph text="Senior Management" />
          </div>
        </div>
      </div>
      <div className="flex justify-between flex-col md:flex-row items-center my-8 md:my-0 w-full">
        <p className="font-marope font-semibold text-[16px] leading-[24px] text-white ">
          ©2024 OES All rights reserved
        </p>
        <div className="hidden md:flex items-center  my-4">
          <div className="relative w-[24px] h-[24px] mx-2">
            <Image src={"/footer1.svg"} alt="" fill />
          </div>
          <div className="relative w-[24px] h-[24px] mx-2">
            <Image src={"/footer2.svg"} alt="" fill />
          </div>
          <div className="relative w-[24px] h-[24px] mx-2">
            <Image src={"/footer3.svg"} alt="" fill />
          </div>
          <div className="relative w-[24px] h-[24px] mx-2">
            <Image src={"/footer4.svg"} alt="" fill />
          </div>
          <div className="relative w-[24px] h-[24px] mx-2">
            <Image src={"/footer5.svg"} alt="" fill />
          </div>
        </div>
        <div className="flex items-center justify-center w-full md:hidden">
          <img src="/mobileFooter.svg" alt="" className="mx-2" />
          <img src="/mobileFooter2.svg" alt="" className="mx-2" />
          <img src="/mobileFooter3.svg" alt="" className="mx-2" />
          <img src="/mobileFooter4.svg" alt="" className="mx-2" />
          <img src="/mobileFooter5.svg" alt="" className="mx-2" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
