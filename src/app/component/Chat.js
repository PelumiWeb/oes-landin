import React, { useState, useRef } from 'react';

const Chat= () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [messages, setMessages] = useState([]);
    const mediaRecorderRef = useRef(null);
    const audioPlaybackRef = useRef(null);
    const chatInputRef = useRef(null);

    const handleSendTextMessage = () => {
        const userMessage = chatInputRef.current.value;
        if (userMessage.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { text: userMessage, sender: 'user' },
            ]);
            chatInputRef.current.value = '';

            // Send the message to the server
            fetch('/datingai/chat/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            })
            .then(response => response.json())
            .then(data => {
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: data.response, sender: 'advisor' },
                ]);
            })
            .catch(error => console.error('Error sending text message:', error));
        }
    };

    const handleStartRecording = () => {
        if (isRecording) return;

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();
                mediaRecorderRef.current = mediaRecorder;

                const audioChunks = [];
                mediaRecorder.ondataavailable = event => {
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

                    fetch('/datingai/voicechat/', {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': document.querySelector('meta[name="csrf-token"]').content,
                        },
                        body: formData,
                    })
                    .then(response => response.json())
                    .then(data => {
                        setMessages(prevMessages => [
                            ...prevMessages,
                            { text: data.message, sender: 'user' },
                            { text: data.response, sender: 'advisor' },
                        ]);
                    })
                    .catch(error => console.error('Error sending audio:', error));
                };

                setIsRecording(true);
            })
            .catch(err => console.error('Error accessing microphone:', err));
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

    return (
        <div className="flex justify-center p-4 bg-white min-h-screen">
            <div className="bg-black text-white w-full max-w-2/3 rounded-lg shadow-lg">
                <div className="p-4 overflow-y-auto h-96" id="chat-box">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-2 ${message.sender === 'user' ? 'text-left' : 'text-right'}`}
                        >
                            <b>{message.sender === 'user' ? 'You' : 'Adviser'}:</b> {message.text}
                        </div>
                    ))}
                </div>
                <div className="p-4 bg-gray-800">
                    <div className="flex space-x-4 items-center">
                        <input
                            ref={chatInputRef}
                            type="text"
                            className="w-full p-2 rounded bg-gray-700 text-white"
                            placeholder="Type a message..."
                            onInput={() => handleSendTextMessage()}
                        />
                        <button
                            onClick={handleSendTextMessage}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400"
                        >
                            Send
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-800">
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
                    <div className="flex space-x-2">
                        <button
                            onClick={handlePlayAudio}
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
                            disabled={!audioBlob || isPlaying}
                        >
                            Play
                        </button>
                        <button
                            onClick={handlePauseAudio}
                            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-500"
                            disabled={!audioBlob || !isPlaying}
                        >
                            Pause
                        </button>
                        <button
                            onClick={handleStopAudio}
                            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
                            disabled={!audioBlob}
                        >
                            Stop
                        </button>
                    </div>
                    <audio ref={audioPlaybackRef} className="hidden" controls />
                </div>
            </div>
        </div>
    );
};

export default Chat;
