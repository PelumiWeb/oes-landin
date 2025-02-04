"use client";
import React from "react";
import Header from "../component/Header";
import ConnectOES from "../component/ConnectOES";
import Footer from "../component/Footer";
import LabelInput from "../component/LabelInput";
import axios from "axios";

import { Input } from "antd";
import CustomButton from "../component/CustomButton";
import { toast } from "react-toastify";

const { TextArea } = Input;

type Props = {};

const page = (props: Props) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobileNumber, setMobileNuumber] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [school, setSchool] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const requestSuccesfull = () =>
    toast.success(
      " Information Submitted. We'll be in touch soon to offer our feedback."
    );

  const requestFailed = () => toast.error(" Request Failed");

  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", name);
    formData.append("passidno", email);
    formData.append("phoneno", mobileNumber);
    formData.append("anyissue", msg);
    formData.append("companyname", school);
    formData.append("school", "OES_OER");
    formData.append("helpdeskperson", "Web-Enquiry");
    formData.append("whotosee", "The school Admin");
    formData.append("sessionyear", "2022/2023");

    const response = axios({
      method: "post",
      url: "https://applications.oes.com.ng/OESWebApp/addreception.do?",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        requestSuccesfull();
        setLoading(false);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        requestFailed();

        setLoading(false);
      });
  };
  
  return (
    <div className="w-full h-full bg-white md:bg-hero-Image bg-cover bg-no-repeat">
      <Header />
      <div className="h-full px-16 py-4">
        <div className="my-8">
          <h3>Contact Us</h3>
          <p className="text-lg lg:text-xl text-[#414D60]">
            We’d love to hear from you! Whether you have questions, feedback.{" "}
          </p>
        </div>

        <div>
          <h3>Get in Touch</h3>
          <p className="text-lg lg:text-xl text-[#414D60]">
            You can reach out to us using the following contact details:{" "}
          </p>
          <ul className="list-disc">
            <li className="ml-6">
              <p className="text-lg lg:text-xl text-[#414D60]">
                <span>Email:</span> enquiries@hremsoft.com
              </p>
            </li>
            <li className="ml-6">
              <p className="text-lg lg:text-xl text-[#414D60]">
                <span>Phone: </span> +234 811 543 1031
              </p>
            </li>
            <li className="ml-6">
              <p className="text-lg lg:text-xl text-[#414D60]">
                <span>Address:</span> #3277 Robert street, Burlington, ON,
                Canada
              </p>
            </li>
          </ul>
        </div>

        {/* Form */}
        <div className="  w-full bg-[#F4F6F9]  my-16 rounded-[24px] shadow-shadow-success p-4  lg:p-8 h-full grid place-items-center">
          <p className="text-lg lg:text-xl text-[#414D60] text-center">
            Do you have any question for us? Will you like to subscribe to our
            product, please, do not hesitate to connect to us via this medium.
            Safe and Secure.
          </p>

          <div className="flex items-center justify-between w-full md:w-[600px] flex-col md:flex-row">
            <LabelInput
              value=""
              placeholder="Enter you email"
              width="w-[90%]"
              mr="mr-4"
            />
            <LabelInput
              value=""
              placeholder="Enter your full Name"
              width="w-[90%]"
            />
          </div>
          <div className="flex items-center justify-between w-full md:w-[600px] flex-col md:flex-row">
            <LabelInput
              value=""
              placeholder="Enter your school"
              width="w-[90%]"
              mr="mr-4"
            />
            <LabelInput
              value=""
              placeholder="Enter your Phone No"
              width="w-[90%]"
            />
          </div>
          <div className="flex items-center justify-center w-full md:w-[600px] flex-col md:flex-row">
            <TextArea rows={4} placeholder="maxLength is 6" />
          </div>

          <div className="flex items-center justify-center w-full md:w-[600px] flex-col md:flex-row mt-4">
            <CustomButton
              onClick={handleSubmit}
              title="Subscribe"
              backgrounColor="bg-[#028036]"
              radius="rounded-[100px]"
              width="w-full md:w-[175px]"
              height="h-[56px]"
              textStyle="text-center text-white ml-8"
              loading={loading}
            />
          </div>
        </div>
      </div>

      {/* <ConnectOES /> */}
      <Footer />
    </div>
  );
};

export default page;
