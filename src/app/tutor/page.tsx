"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Recorder from "recorder-js";
import { TypeAnimation } from "react-type-animation";

type Props = {};

const page = (props: Props) => {
  const [recorder, setRecorder] = useState<Recorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [buttonPressed, setPressed] = useState(false);

  useEffect(() => {
    const initRecorder = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const audioContext = new window.AudioContext();
      setRecorder(new Recorder(audioContext));
      recorder?.init(stream);
    };
    initRecorder();
  }, []);

  const startRecording = () => {
    recorder?.start();
  };

  const stopRecording = async () => {
    if (recorder) {
      const { blob } = await recorder.stop();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    }
  };

  return (
    <div className="relative w-full h-screen bg-white">
      <div className="w-full flex justify-center items-center my-8">
        <div className="relative w-[100px] h-[100px]">
          <Image
            src={"/logosOES.svg"}
            className="w-full h-full object-cover"
            alt=""
            fill
          />
        </div>
      </div>

      {buttonPressed ? (
        <div className="w-full flex items-center justify-center p-4">
          <div className="bg-black border border-[#E6E6E6] w-full h-[400px] p-4 rounded-[10px]">
            {/* Content will be here */}
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "We produce food for Mice",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "We produce food for Hamsters",
                1000,
                "We produce food for Guinea Pigs",
                1000,
                "We produce food for Chinchillas",
                1000,
              ]}
              wrapper="span"
              speed={50}
              style={{
                fontSize: "2em",
                display: "inline-block",
                color: "white",
              }}
              repeat={Infinity}
            />
          </div>
        </div>
      ) : (
        <div className="my-12">
          <p className="font-inter font-medium text-[38px] leading-[45px] w-full text-center">
            Ask{" "}
            <span className="bg-text-gradient bg-clip-text text-transparent w-full">
              OES AI
            </span>{" "}
            <span className="text-[#000]">what ever you need help with</span>
          </p>
          <p className="font-inter text-[20px] leading-[24px] after:text-center text-[#000000] text-center mt-4">
            Sub text for OES
          </p>
        </div>
      )}
      <div>{audioUrl && <audio src={audioUrl} controls />}</div>
      <div className="absolute bottom-32 left-0 right-0  flex justify-center items-center px-[32px]">
        <div className="flex items-center  w-full bg-[#8C8C8C3D] rounded-[40px] h-full">
          <div className="flex items-center w-full">
            <div className=" bg-[#424242] rounded-[32px] w-[64px] h-[64px]  flex items-center justify-center">
              <img
                src="/attach.svg"
                //   className="w-full h-full object-cover"
                alt=""
              />
            </div>

            <input
              type="text"
              placeholder="Type your prompt here"
              className="bg-transparent border-none outline-none w-[70%] font-inter text-[20px] text-[#424242] ml-4 placeholder:text-[#424242] placeholder:text-[20px] h-full"
            />
          </div>

          <div className="flex items-center">
            <button
              className="relative w-[30px] h-[30px] mr-6"
              onClick={startRecording}>
              <Image src={"/microphone.svg"} alt="" fill />
            </button>
            <button
              className="relative w-[64px] h-[64px]"
              onClick={() => setPressed((prev) => !prev)}>
              <Image src={"/iconRight.svg"} alt="" fill />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
