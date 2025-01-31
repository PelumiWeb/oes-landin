"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import CustomButton from "./CustomButton";

type Props = {};
type FaqComponentProps = {
  id: string;
  header: string;
  text: string;
};

const data = [
  {
    id: "01",
    header: "What kind of resources does OES offer to students?",
    text: "Yes you can unsubscribe from the newsletter anytime. Simply click the “unsubscribe” link at the bottom of any newsletter email you receive.",
  },
  {
    id: "02",
    header: "How can i sign up for newsletter to be receiving updates?",
    text: "Yes you can unsubscribe from the newsletter anytime. Simply click the “unsubscribe” link at the bottom of any newsletter email you receive.",
  },
  {
    id: "03",
    header:
      "Is there a cost to access the resources and how much does it cost?",
    text: "Yes you can unsubscribe from the newsletter anytime. Simply click the “unsubscribe” link at the bottom of any newsletter email you receive.",
  },
  {
    id: "04",
    header: "Can i unsubscribe from the newsletter?",
    text: "Yes you can unsubscribe from the newsletter anytime. Simply click the “unsubscribe” link at the bottom of any newsletter email you receive.",
  },
  {
    id: "05",
    header: "How can i track my academic performance with OES?",
    text: "Yes you can unsubscribe from the newsletter anytime. Simply click the “unsubscribe” link at the bottom of any newsletter email you receive.",
  },
];
const FaqComponent = (props: FaqComponentProps) => {
  const [active, setActive] = React.useState(false);
  return (
    <motion.div
      layout
      className={` flex items-start justify-around w-[300px]  lg:w-[500px] rounded-[20px] border border-[#E6E9EA] transition-all p-2 ${
        active
          ? "h-[200px] bg-[#E6F0FF] border-[#028036]"
          : "h-[80px] bg-white border-[#E6E9EA]"
      }`}>
      <div className="w-[56px] h-[56px] bg-[#EDEEF0] flex items-center justify-center rounded-full">
        <p className="font-medium text-[20px] leading-[30px] font-marope">
          {props.id}
        </p>
      </div>
      <div className="w-[85%] h-full">
        <p className="font-marope text-[10px] md:text-[14px]  lg:text-[20px] leading-[24px] text-[#1E242C] mb-4 ml-2">
          {props.header}
        </p>
        {active && (
          <motion.p
            initial={{ opacity: 0, y: 10 }} // Start hidden & lower
            animate={{ opacity: 1, y: 0 }} // Animate to visible & normal position
            exit={{ opacity: 0, y: 10 }} // Hide smoothly when removed
            transition={{ duration: 0.3 }} // 300ms animation
            className="font-marope font-normal text-[12px] md:text-[14px] lg:text-[16px] leading-[24px]">
            {props.text}
          </motion.p>
        )}
      </div>
      <button
        className={`relative w-[10px] lg:w-[20px] h-[10px] lg:h-[20px] `}
        onClick={() => setActive((prev) => !prev)}>
        {active ? (
          <Image
            src={"/cancelIcon.svg"}
            className="w-full object-contain"
            alt=""
            fill
          />
        ) : (
          <Image
            src={"/addIcon.svg"}
            className="w-full object-contain"
            alt=""
            fill
          />
        )}
      </button>
    </motion.div>
  );
};

const Faq = (props: Props) => {
  return (
    <div className="px-8 lg:px-32  py-4 lg:py-16 bg-white">
      <h3 className="text-[#1E242C] my-4">Frequently asked Questions</h3>

      <div className="grid place-items-center  md:grid-cols-2 gap-y-4 h-full">
        {data.map((data, index) => (
          <FaqComponent key={index} {...data} />
        ))}
      </div>

      <div className="h-full lg:h-[390px] w-full bg-gradient-bg bg-cover bg-no-repeat my-16 rounded-[24px] shadow-shadow-success p-4  lg:p-8">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <p className="font-marope font-medium text-[16px]  md:text-[30px] lg:text-[40px] leading-[20px] md:leading-[38px] lg:leading-[48px] text-center w-[70%]">
            Boost Your Academic Success: Join Our Newsletter for the Latest
            Updates
          </p>
          <p className="font-marope text-[16px] leading-[24px] text-center text-[#414D60] w-full lg:w-[50%] my-2">
            Boost your academic Excellence: Subscribe to Our Newsletter for
            Fresh Updates and Valuable Resources! Opt out whenever you like.
          </p>
          <div>
            <div className="flex items-center my-4 flex-col md:flex-row">
              <div className="w-[300px] h-[60px] rounded-[56px] bg-white flex items-center shadow-input-shadow px-2 mr-2 mb-4 lg:mb-0">
                <div className="relative w-[24px] h-[24px]">
                  <Image src={"/message.svg"} alt="" fill />
                </div>
                <input
                  type="text"
                  className="border-none outline-none w-[80%] h-full font-marope font-medium leading-[24px] ml-2"
                  placeholder="Your email address"
                />
              </div>
              <CustomButton
                title="Subscribe"
                backgrounColor="bg-[#028036]"
                radius="rounded-[100px]"
                width="w-full md:w-[175px]"
                height="h-[56px]"
                textStyle="text-center text-white ml-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
