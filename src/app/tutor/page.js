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
  const chatInputRef1 = useRef("Hi");
  const imageInputRef = useRef(null);
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState('');

  // Function to get the CSRF token from cookies
  const getCsrfToken = () => {
    return Cookies.get('csrftoken');
  };



  // Handle sending a text message
  const handleSendTextMessage = () => {
    const userMessage = chatInputRef1.current?.value; // Safe access
    if (userMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: userMessage, sender: 'user' },
      ]);
      chatInputRef1.current?.value = '';

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

  // Handle starting audio recording
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
      .catch((err) => {
        console.error('Error accessing microphone:', err);
        setError('Unable to access microphone');
      });
  };

  // Handle stopping the audio recording
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (mediaRecorderRef.current?.stream) {
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  // Handle playing the audio
  const handlePlayAudio = () => {
    if (audioBlob) {
      const audioUrl = URL.createObjectURL(audioBlob);
      audioPlaybackRef.current.src = audioUrl;
      audioPlaybackRef.current.play();
      setIsPlaying(true);
    }
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

  // Handle image upload
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

  // Handle taking a picture
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

  // Start the camera
  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
        setError('Unable to access camera');
      });
  };

  // Stop the camera
  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => track.stop());
    setIsCameraActive(false);
  };

  // Convert data URL to Blob for image upload
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
              <div>{message.text}</div>
            </div>
          ))}
        </div>

        <div className="flex p-4">
          <input
            ref={chatInputRef1}
            type="text"
            className="flex-1 p-2 rounded-l-lg"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendTextMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-400"
          >
            Send
          </button>
        </div>
      </div>

      {/* Audio Controls */}
      {audioBlob && (
        <div className="flex space-x-2 mt-4">
          <button
            onClick={handlePlayAudio}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400"
          >
            Play
          </button>
          <button
            onClick={handlePauseAudio}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400"
          >
            Pause
          </button>
          <button
            onClick={handleStopAudio}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
          >
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
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
          >
            Start Camera
          </button>
        )}
        {isCameraActive && (
          <button
            onClick={stopCamera}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Stop Camera
          </button>
        )}
      </div>

      <div className="mt-4">
        <video
          ref={videoRef}
          width="320"
          height="240"
          autoPlay
          muted
          className="border rounded-lg"
        ></video>
      </div>

      {/* Image Preview */}
      {imagePreview && <img src={imagePreview} alt="Preview" className="mt-4 max-w-full h-auto" />}
      
      {/* File upload and take picture */}
      <div className="mt-4 space-x-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageInputRef}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
        />
        <button
          onClick={handleTakePicture}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-400"
        >
          Take Picture
        </button>
      </div>
    </div>
  );
};

export default Page;
