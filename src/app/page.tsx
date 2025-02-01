"use client";
import Image from "next/image";
import Hero from "./component/Hero";
import Study from "./component/Study";
import TrustedComponent from "./component/TrustedComponent";
import ConnectOES from "./component/ConnectOES";
import LearningLimits from "./component/LearningLimits";
import UserComment from "./component/UserComment";
import Faq from "./component/Faq";
import Chat from "./tutor/page";
import Footer from "./component/Footer";

export default function Home() {
  return (
    <div className="bg-white h-full w-full">
      <Hero />
      <Study />
      <TrustedComponent />
      <ConnectOES />
      <LearningLimits />
      {/* <UserComment /> */}
      {/* <Faq /> */}
      <Footer />
    </div>
  );
}
