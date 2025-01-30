import Image from "next/image";
import React from "react";
import CustomButton from "./CustomButton";

type Props = {};

const ButtonCard = () => {
  return (
    <div className=" w-[260px] h-[228px] rounded-[20px]  shadow-study-card flex flex-col justify-around items-center">
      <div className="w-full flex items-center justify-center">
        <div className="relative w-[48px] h-[48px]">
          <Image src={"/studyImage.svg"} alt="" fill />
        </div>
      </div>
      <div className="">
        <p className="font-marope font-bold text-[20px] leading-[30px] text-center text-[#1E242C]">
          Community Support
        </p>
        <p className="font-normal text-[12px] leading-[18px] text-center text-[#1E242C]">
          Join a supportive learning community
        </p>
      </div>
      <CustomButton
        title="Join OES"
        borderWidth="border"
        borderColor="border-[#028036]"
        backgrounColor="bg-[#028036]"
        radius="rounded-[100px]"
        width="w-[100px]"
        height="h-[35px]"
        textStyle="text-[12px] font-marope leading-[18px] text-white text-center"
      />
    </div>
  );
};

const Card = () => {
  return (
    <div className="w-[260px] h-[100px] rounded-[20px] bg-white shadow-study-card flex items-center">
      <div className="relative w-[48px] h-[48px]">
        <Image src={"/studyImage2.svg"} alt="" fill />
      </div>

      <div className="ml-2">
        <p className=" font-bold text-[20px] leading-[30px] text-[#1E242C]">
          100k+
        </p>
        <p className="font-normal font-marope leading-[18px] text-[#414D60]">
          Worldwide Active Users
        </p>
      </div>
    </div>
  );
};

const Study = (props: Props) => {
  return (
    <div className=" w-full h-full ">
      <h3 className=" text-[#1E242C] text-center">Why Study With OES ?</h3>
      <div className=" z-20 w-full flex items-center justify-center ">
        <p className="font-marope font-medium text-[#414D60] text-[16px] leading-[24px] text-center w-[50%]">
          Embrace the future of education with our Comprehensive resources and
          interactive tools. For educators, it’s an opportunity to build a
          legacy of Knowledge.
        </p>
      </div>

      <div className="relative w-full flex items-center justify-center my-6">
        {/* Left */}
        <div className="z-20 absolute top-[20%] left-[20%] flex h-full">
          <div className="absolute left-0 top-0">
            <ButtonCard />
          </div>
          <div className="absolute left-0 top-[50%]">
            <Card />
          </div>
        </div>
        {/* Center */}
        <div className="relative z-0 w-[470px] h-[470px] bg-wavy-circle bg-cover bg-no-repeat flex justify-center items-center">
          <img
            src={"/studyPerson.svg"}
            className="w-[280px] h-[420px] object-cover z-0 rounded-[10px]"
            alt=""
          />
        </div>
        {/* Right */}
        <div className="z-20 absolute top-[0%] right-[20%] flex w-full h-full">
          <div className="absolute right-[0%] top-0">
            <ButtonCard />
          </div>
          <div className="absolute right-0 top-[50%]">
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
