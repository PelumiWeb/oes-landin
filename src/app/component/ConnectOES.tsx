import Image from "next/image";
import React from "react";

type Props = {};
type ConnectProps = { image: string; text: string; title: string };

const ConnectComponent = (props: ConnectProps) => {
  return (
    <div className="w-[350px] lg:w-[457px] h-[100px] shadow-connect-shadow flex items-center rounded-[20px] justify-between p-2">
      <div className="relative w-[56px] h-[56px]">
        <Image src={props.image} alt="" fill />
      </div>
      <div className=" w-[80%]">
        <p className="text-[#1E242C]  text-[12px] md:text-[20px] lg:text-[24px] font-semibold lg:font-medium leading-[28px]  font-marope">
          {props.title}
        </p>
        <p className="text-[#414D60] text-[10px] md:text-[15px]  lg:text-[18px] font-medium leading-[24px]  font-marope">
          {props.text}
        </p>
      </div>
    </div>
  );
};

const ConnectOES = (props: Props) => {
  return (
    <div className="py-8 lg:py-16 px-16 lg:px-32 flex items-center justify-center lg:justify-between bg-white  flex-col lg:flex-row w-full">
      <div className="w-full">
        <h3 className="text-[#1E242C] text-center md:text-left ">
          Connect with OES
        </h3>
        <div className="my-8 md:my-0">
          <div className="flex items-center w-full justify-center my-2">
            <p className="font-marope text-[60px] md:text-[80px] lg:text-[108px]  text-[#1E242C] leading-[130px] font-medium ">
              01
            </p>
            <ConnectComponent
              text=" Empower your institution with advanced tools and seamless
          communication"
              title="  Connect as a School"
              image={"/connect1.svg"}
            />
          </div>
          <div className="flex  items-center w-full justify-center">
            <ConnectComponent
              text="Access tailored resources and stay connected with your educational Journey"
              title="Connect as Student/ Parent"
              image={"/connect2.svg"}
            />
            <p className="font-marope text-[60px] md:text-[80px] lg:text-[108px]  text-[#002B6B] leading-[130px] font-medium ">
              02
            </p>
          </div>
          <div className="flex items-center w-full justify-center my-2">
            <p className="font-marope text-[60px] md:text-[80px] lg:text-[108px]  text-[#002B6B] leading-[130px] font-medium ">
              03
            </p>
            <ConnectComponent
              text="Reach more students & enhance your teaching experience with OES"
              title="Connect as Private Teacher"
              image={"/connect3.svg"}
            />
          </div>
        </div>
      </div>

      <div className="h-full flex justify-center items-center w-full pl-0  md:pl-[100px] lg:pl-0">
        <div className="">
          {/* Image */}
          <div className="relative w-[165px] h-[250px] lg:w-[215px] lg:h-[300px]">
            <Image src={"connectImage1.svg"} alt="" fill />
          </div>
          <div className="w-[120%] h-[90px] rounded-[20px] p-4 flex items-center bg-white my-1 shadow-avg-user-shadow relative z-10">
            <div className="flex items-center">
              <div className="relative w-[56px] h-[56px] border-[1px] border-white rounded-full">
                <Image
                  src={"/avatar2.svg"}
                  className="object-cover"
                  alt=""
                  fill
                />
              </div>
              <div className="relative w-[56px] h-[56px] border-[1px] border-white -ml-4 rounded-full">
                <Image
                  src={"/avatar.svg"}
                  className="object-cover"
                  alt=""
                  fill
                />
              </div>
              <div className="relative w-[56px] h-[56px] border-[1px] border-white -ml-4 rounded-full">
                <Image
                  src={"/avatar3.svg"}
                  className="object-cover"
                  alt=""
                  fill
                />
              </div>
            </div>
            <div>
              <h4 className="font-marope font-bold text-[20px] leading-[30px] text-[#028036]">
                10K +
              </h4>
              <p className="font-marope font-semibold leading-[21px] text-[14px] text-[#414D60]">
                Avg. Users
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-[291px] lg:w-[341px] h-[350px] lg:h-[390px] z-0 -left-[6%]">
          <Image
            src={"connectImage2.svg"}
            className="object-contain w-full h-full"
            alt=""
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectOES;
