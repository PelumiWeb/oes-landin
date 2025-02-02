"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import { FaMicrophone, FaStop, FaCamera } from "react-icons/fa";

interface Message {
  text: string;
  sender: "user" | "advisor";
}

const getCsrfToken = (): string | undefined => {
  const token = Cookies.get("csrftoken");
  console.log("CSRF Token:", token); // Debugging
  return token;
};

const Page: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const [error, setError] = useState<string>("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);
  const chatInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPictureTaken, setIsPictureTaken] = useState(false);

  const handleSendTextMessage = async () => {
    const userMessage = chatInputRef.current?.value?.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    chatInputRef.current!.value = "";

    try {
      const response = await fetch("http://localhost:8000/datingai/chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCsrfToken() || "",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { text: data.response, sender: "advisor" },
      ]);
    } catch (err) {
      console.error("Error sending text message:", err);
    }
  };

  const handleStartRecording = async () => {
    if (isRecording) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      mediaRecorderRef.current = mediaRecorder;
      setIsRecording(true);

      const audioChunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => audioChunks.push(event.data);

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);

        if (audioPlaybackRef.current) {
          audioPlaybackRef.current.src = URL.createObjectURL(audioBlob);
        }

        const formData = new FormData();
        formData.append("audio", audioBlob);

        try {
          const response = await fetch(
            "http://localhost:8000/datingai/voicechat/",
            {
              method: "POST",
              headers: { "X-CSRFToken": getCsrfToken() || "" },
              body: formData,
            }
          );
          const data = await response.json();
          setMessages((prev) => [
            ...prev,
            { text: data.message, sender: "user" },
            { text: data.response, sender: "advisor" },
          ]);
        } catch (err) {
          console.error("Error sending audio:", err);
        }
      };
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Unable to access microphone");
    }
  };

  // const handleStopRecording = () => {
  //   mediaRecorderRef.current?.stop();
  //   setIsRecording(false);
  //   mediaRecorderRef.current?.stream
  //     .getTracks()
  //     .forEach((track) => track.stop());
  // };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        "http://localhost:8000/datingai/upload-image/",
        {
          method: "POST",
          headers: { "X-CSRFToken": getCsrfToken() || "" },
          body: formData,
        }
      );
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { text: "Image uploaded", sender: "user" },
        { text: data.response, sender: "advisor" },
      ]);
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Unable to access camera");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsCameraActive(false);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (mediaRecorderRef.current?.stream) {
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
    }
  };

  const dataURLtoBlob = (dataURL: string): Blob | null => {
    try {
      const arr = dataURL.split(",");
      const mimeMatch = arr[0].match(/:(.*?);/);
      if (!mimeMatch) return null;

      const mime = mimeMatch[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new Blob([u8arr], { type: mime });
    } catch (error) {
      console.error("Error converting data URL to Blob:", error);
      return null;
    }
  };

  const handleTakePicture = () => {
    if (!videoRef.current) return;

    const videoElement = videoRef.current;
    const canvas = document.createElement("canvas");

    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const context = canvas.getContext("2d");
    if (!context) {
      console.error("Failed to get canvas context");
      return;
    }

    context.drawImage(videoElement, 0, 0);

    const imageDataUrl: any = canvas.toDataURL("image/png");
    setImagePreview(imageDataUrl);

    const imageBlob = dataURLtoBlob(imageDataUrl);
    if (!imageBlob) {
      console.error("Failed to convert image to Blob");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageBlob);

    const csrfToken = getCsrfToken();
    if (!csrfToken) {
      console.error("CSRF token not found");
      return;
    }

    fetch("http://localhost:8000/datingai/upload-image/", {
      method: "POST",
      headers: { "X-CSRFToken": csrfToken },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Picture taken and uploaded", sender: "user" },
          { text: data.response, sender: "advisor" },
        ]);
      })
      .catch((error) => console.error("Error uploading picture:", error));
  };

  // Handle playing the audio
  const handlePlayAudio = () => {
    if (!audioBlob || !audioPlaybackRef.current) return;

    const audioUrl = URL.createObjectURL(audioBlob);
    const audioElement = audioPlaybackRef.current;

    audioElement.src = audioUrl;
    audioElement
      .play()
      .then(() => setIsPlaying(true))
      .catch((error) => console.error("Error playing audio:", error));
  };

  // Handle pausing the audio
  const handlePauseAudio = () => {
    if (audioPlaybackRef.current) {
      audioPlaybackRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle stopping the audio
  const handleStopAudio = () => {
    if (audioPlaybackRef.current) {
      audioPlaybackRef.current.pause();
      audioPlaybackRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white min-h-screen">
      {/* Logo space */}
      <div className="w-full flex justify-center py-4">
        <div className="relative w-[100px] h-[100px]">
          <Image src="/logosOES.svg" fill alt="Logo" />
        </div>
      </div>

      {/* Chat window */}
      <div className="bg-black text-white w-full max-w-2/3 rounded-lg shadow-lg flex flex-col h-[60vh]">
        <div className="p-4 overflow-y-auto flex-1" id="chat-box">
          <div className="mt-4">
            {!isPictureTaken ? (
              <video
                ref={videoRef}
                width="320"
                height="240"
                autoPlay
                muted
                className="border rounded-lg"></video>
            ) : (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-4"
                width="320"
                height="240"
              />
            )}
          </div>

          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 ${
                message.sender === "user" ? "text-left" : "text-right"
              }`}>
              <div>{message.text}</div>
            </div>
          ))}
        </div>

        <div className="flex p-4">
          <input
            ref={chatInputRef}
            className="flex-1 p-2 rounded-l-lg text-black"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendTextMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-400">
            Send
          </button>
        </div>
      </div>

      {/* Audio Controls */}
      {audioBlob && (
        <div className="flex space-x-2 mt-4">
          <button
            onClick={handlePlayAudio}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400">
            Play
          </button>
          <button
            onClick={handlePauseAudio}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400">
            Pause
          </button>
          <button
            onClick={handleStopAudio}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400">
            Stop
          </button>
        </div>
      )}

      {/* Error message */}
      {error && <div className="text-red-500 mt-2">{error}</div>}

      {/* Camera controls */}
      <div className="mt-4">
        {!isCameraActive && (
          <button
            onClick={startCamera}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">
            Start Camera
          </button>
        )}
        {isCameraActive && !isPictureTaken && (
          <button
            onClick={stopCamera}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
            Stop Camera
          </button>
        )}
      </div>

      {/* Audio Recorder */}
      <div className="mt-4 flex space-x-4">
        {isRecording ? (
          <button
            onClick={handleStopRecording}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500">
            <FaStop />
          </button>
        ) : (
          <button
            onClick={handleStartRecording}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500">
            <FaMicrophone />
          </button>
        )}
      </div>

      {/* File upload and take picture */}
      <div className="mt-4 space-x-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageInputRef}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
        />
        {!isPictureTaken && (
          <button
            onClick={handleTakePicture}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-400">
            <FaCamera /> Take Snap
          </button>
        )}
      </div>
    </div>
  );
};

export default Page;
