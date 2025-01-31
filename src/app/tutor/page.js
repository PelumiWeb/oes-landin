'use client'; // This line tells Next.js to treat this file as a client-side component

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';


const Page = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [messages, setMessages] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioPlaybackRef = useRef(null);
  const chatInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const getCsrfToken = () => {
    return Cookies.get('csrftoken');
  };

  const fetchCsrfToken = () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
    if (!csrfToken) {
      console.error("CSRF token is missing from the page.");
    }
    return csrfToken;
  };

  const handleSendTextMessage = () => {
    const userMessage = chatInputRef.current.value;
    if (userMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userMessage, sender: 'user' },
      ]);
      chatInputRef.current.value = '';

      // Send the message to the server
      fetch('http://localhost:8000/datingai/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        body: JSON.stringify({ message: userMessage }),
      })
        .then((response) => response.json())
        .then((data) => {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.response, sender: 'advisor' },
          ]);
        })
        .catch((error) => console.error('Error sending text message:', error));
    }
  };

  const handleStartRecording = () => {
    if (isRecording) return;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks = [];
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
          const audioUrl = URL.createObjectURL(audioBlob);
          audioPlaybackRef.current.src = audioUrl;

          // Send audio to server
          const formData = new FormData();
          formData.append('audio', audioBlob);

          const csrfToken = getCsrfToken();
          if (csrfToken) {
            fetch('http://localhost:8000/datingai/voicechat/', {
              method: 'POST',
              headers: {
                'X-CSRFToken': csrfToken,
              },
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                setMessages((prevMessages) => [
                  ...prevMessages,
                  { text: data.message, sender: 'user' },
                  { text: data.response, sender: 'advisor' },
                ]);
              })
              .catch((error) => console.error('Error sending audio:', error));
          }
        };

        setIsRecording(true);
      })
      .catch((err) => console.error('Error accessing microphone:', err));
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handlePlayAudio = () => {
    if (audioPlaybackRef.current) {
      audioPlaybackRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePauseAudio = () => {
    if (audioPlaybackRef.current) {
      audioPlaybackRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleStopAudio = () => {
    if (audioPlaybackRef.current) {
      audioPlaybackRef.current.pause();
      audioPlaybackRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('image', file);

      const csrfToken = getCsrfToken();
      if (csrfToken) {
        fetch('http://localhost:8000/datingai/upload-image/', {
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: 'Image uploaded', sender: 'user' },
              { text: data.response, sender: 'advisor' },
            ]);
          })
          .catch((error) => console.error('Error uploading image:', error));
      }
    }
  };

  const handleTakePicture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

      const image = canvas.toDataURL('image/png');
      setImagePreview(image);

      const formData = new FormData();
      formData.append('image', dataURLtoBlob(image));

      const csrfToken = getCsrfToken();
      if (csrfToken) {
        fetch('http://localhost:8000/datingai/upload-image/', {
          method: 'POST',
          headers: {
            'X-CSRFToken': csrfToken,
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            setMessages((prevMessages) => [
              ...prevMessages,
              { text: 'Picture taken and uploaded', sender: 'user' },
              { text: data.response, sender: 'advisor' },
            ]);
          })
          .catch((error) => console.error('Error uploading picture:', error));
      }
    }
  };

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      })
      .catch((err) => console.error('Error accessing camera:', err));
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    setIsCameraActive(false);
  };

  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uintArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uintArray[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: 'image/png' });
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white min-h-screen">
      {/* Logo space */}
      <div className="w-full flex justify-center py-4">
        <div className="relative w-[100px] h-[100px]">
          <Image src={"/logosOES.svg"} fill alt="" />
        </div>
      </div>

      {/* Chat window */}
      <div className="bg-black text-white w-full max-w-2/3 rounded-lg shadow-lg flex flex-col h-[60vh]">
        <div className="p-4 overflow-y-auto flex-1" id="chat-box">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 ${message.sender === 'user' ? 'text-left' : 'text-right'}`}
            >
              <b>{message.sender === 'user' ? 'You' : 'Advisor'}:</b> {message.text}
            </div>
          ))}
        </div>
      </div>

      {/* Recorder Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 flex flex-col space-y-4 items-center">
        <div className="w-full max-w-2/3 bg-gray-700 p-4 rounded-lg flex items-center space-x-4">
          <input
            ref={chatInputRef}
            type="text"
            className="w-full p-2 rounded bg-gray-600 text-white"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendTextMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
          >
            Send
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={handleStartRecording}
            className={`bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 ${isRecording ? 'hidden' : ''}`}
          >
            🎤
          </button>
          <button
            onClick={handleStopRecording}
            className={`bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 ${!isRecording ? 'hidden' : ''}`}
          >
            Stop
          </button>
        </div>

        {/* Image Upload */}
        <div className="flex space-x-2">
          <input
            type="file"
            ref={imageInputRef}
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            onClick={() => imageInputRef.current.click()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
          >
            Upload Image
          </button>

          {/* Camera Start/Stop */}
          <button
            onClick={startCamera}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            Start Camera
          </button>
          {isCameraActive && (
            <button
              onClick={handleTakePicture}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500"
            >
              Take Picture
            </button>
          )}
        </div>
      </div>

      {/* Hidden audio playback element */}
      <audio ref={audioPlaybackRef} className="hidden" controls />

      {/* Camera */}
      {isCameraActive && <video ref={videoRef} autoPlay className="hidden" />}
    </div>
  );
};

export default Page;
