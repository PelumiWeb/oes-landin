import Image from "next/image";
import Hero from "./component/Hero";
import Study from "./component/Study";
import TrustedComponent from "./component/TrustedComponent";
import ConnectOES from "./component/ConnectOES";
import LearningLimits from "./component/LearningLimits";
import UserComment from "./component/UserComment";
import Faq from "./component/Faq";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Study />
      <TrustedComponent />
      <ConnectOES />
      <LearningLimits />
      <UserComment />
      <Faq />
    </div>
  );
}
