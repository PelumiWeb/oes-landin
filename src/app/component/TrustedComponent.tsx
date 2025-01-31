import Image from "next/image";
import React from "react";

type Props = {};

const TrustedComponent = (props: Props) => {
  return (
    <div className="h-[450px] bg-[#FAFAFA] py-[88px] px-32">
      <h3 className=" text-[#1E242C] text-center ">
        Trusted by incredible Organizations
      </h3>
      <p className="font-marope font-normal text-[16px] leading-[24px] text-center">
        We Proudly stand as the trusted choice of these esteemed organizations
      </p>
      <div className="flex items-center justify-between h-[200px]">
        <img src="/curencyLogo.svg" alt="" />
        <img src="/currencyLogo1.svg" alt="" />
        <img src="/currencyLogo2.svg" alt="" />
        <img src="/currencyLogo3.svg" alt="" />
        <img src="/currencyLogo4.svg" alt="" />
        {/* <img src="/currencyLogo5.svg" alt="" /> */}
      </div>
    </div>
  );
};

export default TrustedComponent;
