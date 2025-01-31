import React from "react";
import Header from "../component/Header";
import UserComment from "../component/UserComment";
import Faq from "../component/Faq";
import Footer from "../component/Footer";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Header />
      <UserComment />
      <Faq />
      <Footer />
    </div>
  );
};

export default page;
