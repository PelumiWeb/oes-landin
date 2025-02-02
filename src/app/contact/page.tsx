import React from "react";
import Header from "../component/Header";
import ConnectOES from "../component/ConnectOES";
import Footer from "../component/Footer";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full h-full bg-white">
      <Header />
      <div className="h-screen px-16 py-4">
        <div className="my-8">
          <h3>Contact Us</h3>
          <p className="text-lg lg:text-xl">
            We’d love to hear from you! Whether you have questions, feedback.{" "}
          </p>
        </div>

        <div>
          <h3>Get in Touch</h3>
          <p className="text-lg lg:text-xl">
            You can reach out to us using the following contact details:{" "}
          </p>
          <ul className="list-disc">
            <li className="ml-6">
              <p className="text-lg lg:text-xl">
                <span>Email:</span> enquiries@hremsoft.com
              </p>
            </li>
            <li className="ml-6">
              <p className="text-lg lg:text-xl">
                <span>Phone: </span> +234 811 543 1031
              </p>
            </li>
            <li className="ml-6">
              <p className="text-lg lg:text-xl">
                <span>Address:</span> #3277 Robert street, Burlington, ON,
                Canada
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* <ConnectOES /> */}
      <Footer />
    </div>
  );
};

export default page;
