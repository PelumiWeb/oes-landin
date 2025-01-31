import Image from "next/image";
import React from "react";

type Props = {};

const Paragraph = (props: { bold?: boolean; text: string }) => {
  return (
    <p
      className={`my-1 ${
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
    <div className="h-full md:h-[400px] px-2  sm:px-16 md:px-32 py-2 sm:py-8 md:py-16 bg-footer-bg bg-bottom bg-no-repeat w-full">
      <div className="flex items-center md:items-start justify-center md:justify-between flex-col md:flex-row">
        <div className="w-full">
          <div className="relative w-[90px] h-[90px] ">
            <Image src={"/logosOES.svg"} fill alt="" />
          </div>
          <div className="flex items-center w-full">
            <Paragraph text="Phone:" bold />
            <Paragraph text="+234 811 543 1031" />
          </div>
          <div className="flex items-center w-full">
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
        <div>
          <Paragraph text="Others" bold />

          <div>
            <Paragraph text="How it works" />
            <Paragraph text="Terms and condition" />
            <Paragraph text="Privacy Policy" />
            <Paragraph text="About Us" />
          </div>
        </div>
        <div>
          <Paragraph text="Others" bold />

          <div>
            <Paragraph text="How it works" />
            <Paragraph text="Terms and condition" />
            <Paragraph text="Privacy Policy" />
            <Paragraph text="About Us" />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="font-marope font-semibold text-[16px] leading-[24px] text-white ">
          ©2024 OES All rights reserved
        </p>
        <div className="flex items-center  my-4">
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
      </div>
    </div>
  );
};

export default Footer;
