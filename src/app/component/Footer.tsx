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
    <div className="h-[400px]  px-32 py-16 bg-footer-bg bg-bottom bg-no-repeat w-full">
      <div className="flex items-start justify-between">
        <div>
          <div className="relative w-[90px] h-[90px] ">
            <Image src={"/logosOES.svg"} fill alt="" />
          </div>
          <div className="flex items-center">
            <Paragraph text="Phone:" bold />
            <Paragraph text="+234 811 543 1031" />
          </div>
          <div className="flex items-center">
            <Paragraph text="Email:" bold />
            <Paragraph text="enquiries@hremsoft.com" />
          </div>
        </div>
        <div>
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
