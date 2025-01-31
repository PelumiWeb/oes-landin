import React from "react";
import Header from "../component/Header";
import UserComment from "../component/UserComment";
import Faq from "../component/Faq";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Header />
      <UserComment />
      <Faq />
    </div>
  );
};

export default page;
