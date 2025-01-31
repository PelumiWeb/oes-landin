import Image from "next/image";
import React from "react";
import CustomButton from "./CustomButton";
import Header from "./Header";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div className="bg-white md:bg-hero-Image bg-cover bg-no-repeat w-full h-full">
      <Header />
      <div className="flex items-start justify-center w-full px-4 md:px-32 py-2 md:py-8 flex-col md:flex-row">
        <div className="w-full flex justify-center items-center flex-col md:block md:w-[45%]">
          <div className="bg-[#017F361A] md:bg-white rounded-[24px] h-[30px] w-[300px] flex items-center justify-center py-4">
            <div className="relative w-[24px] h-[24px] ">
              <Image src={"jobLink.svg"} alt="" fill />
            </div>
            <p className="font-marope font-normal text-[16px] leading-[24px] text-[#017F36] md:text-[#002B6B] ml-1">
              Your #1 Platform for Education
            </p>
          </div>
          <div>
            <h3 className="font-marope ">Elevate Your Education with OES</h3>
            <p className="font-normal text-[18px] leading-[28px] text-[#414D60] font-marope">
              Join a community of learners and educators to enhance your skills.
              Powered by a public digital library of open Educational resources.
              Explore, create, and collaborate with educators around Africa to
              improve curriculum and skill acquisition.
            </p>
            <div className="mt-4 hidden md:block">
              <CustomButton
                padding="pl-4"
                title="Explore Courses"
                iconRight="/iconRightButtonHeader.svg"
                radius="rounded-[40px]"
                width="w-[220px]"
                height="h-[50px]"
                backgrounColor="bg-[#028036]"
                textStyle="text-white text-center font-bold text-[16px] leading-[24px] font-manrope w-full text-center"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-[45%] md:-mt-[5%]">
          <div className="relative w-[500px] h-[500px]">
            <Image src={"/heroImage.svg"} alt="" fill />
          </div>
          <div className="-mt-[5rem] flex w-full justify-center items-center md:hidden">
            <CustomButton
              padding="pl-4"
              title="Explore Courses"
              iconRight="/iconRightButtonHeader.svg"
              radius="rounded-[40px]"
              width="w-[220px]"
              height="h-[50px]"
              backgrounColor="bg-[#028036]"
              textStyle="text-white text-center font-bold text-[16px] leading-[24px] font-manrope w-full text-center"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
