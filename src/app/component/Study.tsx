import Image from "next/image";
import React from "react";
import CustomButton from "./CustomButton";

type Props = {};
type ComponentProps = {
  image: string;
  headerText: string;
  text?: string;
  buttonText?: string;
};

const ButtonCard = (props: ComponentProps) => {
  return (
    <div className="w-[150px]  md:w-[260px] h-full md:h-[208px] rounded-[20px]  shadow-study-card flex flex-col justify-around items-center p-4 bg-white">
      <div className="w-full flex items-center justify-center">
        <div className="relative w-[24px] md:w-[48px] h-[24px] md:h-[48px]">
          <Image src={props.image} alt="" fill />
        </div>
      </div>
      <div className="">
        <p className="font-marope font-bold text-[12px] md:text-[20px] leading-[15px] lg:leading-[30px] text-center text-[#1E242C]">
          {props.headerText}
        </p>
        <p className="font-normal text-[8px] leading-[10px] md:leading-[18px] text-center text-[#1E242C]">
          {props.text}
        </p>
      </div>
      <CustomButton
        title={props.buttonText}
        borderWidth="border"
        borderColor="border-[#028036]"
        backgrounColor="bg-[#028036]"
        radius="rounded-[100px]"
        width="w-full"
        height="h-[15px] md:h-[35px]"
        textStyle="text-[6px] md:text-[12px] font-marope leading-[10px] md:leading-[18px] text-white text-center w-full "
        padding="p-1"
      />
    </div>
  );
};

const Card = (props: ComponentProps) => {
  return (
    <div className="w-[150px] md:w-[260px] h-[40px] md:h-[100px] rounded-[20px] bg-white shadow-study-card flex items-center px-4">
      <div className="relative w-[24px] md:w-[48px] h-[24px] md:h-[48px]">
        {/* <Image src={"/studyImage2.svg"} alt="" fill /> */}

        <Image src={props.image} alt="" fill />
      </div>

      <div className="ml-2">
        <p className=" font-bold text-[10px] md:text-[20px] leading-[10px] md:leading-[30px] text-[#1E242C]">
          {props.headerText}
        </p>
        {props?.text && (
          <p className="font-normal text-[8px] font-marope leading-[10px] md:leading-[18px] text-[#414D60]">
            {props.text}
          </p>
        )}
      </div>
    </div>
  );
};

const Study = (props: Props) => {
  return (
    <div className=" w-full h-full bg-white  mt-[5rem] md:mt-0">
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
        <div className="z-20 absolute top-[20%] left-[5%] md:left-[0%] lg:left-[10%] xl:left-[20%] flex h-full">
          <div className="absolute left-0 top-0">
            <ButtonCard
              image="/studyImage.svg"
              headerText="Community Support"
              text="Join a supportive learning community"
              buttonText="Join OES"
            />
          </div>
          <div className="absolute left-0 top-[50%]">
            <Card
              image="/studyImage2.svg"
              headerText="100K +"
              text="Worldwide Active  Users"
            />
          </div>
        </div>
        {/* Center */}
        <div className="relative z-0 w-[280px] h-[280px]   md:w-[470px] md:h-[470px] bg-wavy-circle bg-cover bg-no-repeat flex justify-center items-center">
          <img
            src={"/studyPerson.svg"}
            className="w-[180px] md:w-[280px] md:h-[420px] object-cover z-0 rounded-[10px]"
            alt=""
          />
        </div>
        {/* Right */}
        <div className="z-20 absolute top-[0%] right-[25%] md:right-[0%] lg:right-[10%] xl:right-[20%] flex w-full h-full">
          <div className="absolute -right-[20%] md:right-[0%] top-[20%] md:top-0">
            <Card
              image="/studyImage3.svg"
              headerText="Networking Opportunities"
            />
          </div>
          <div className="absolute  -right-[20%] md:right-0 top-[40%] md:top-[24%]">
            <ButtonCard
              image="/studyImage4.svg"
              headerText="Interactive Learning"
              text="Engage with dynamic content"
              buttonText="Networking Opportunities"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;
