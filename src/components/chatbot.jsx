import React, { useState, useEffect, useRef } from 'react';

// Assuming you have already configured the GoogleGenerativeAI instance
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyDcw5qJwF3KkDNZI2cG_9vVvCDjLLMXGik';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    sendInitialMessage();
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const appendMessage = (sender, message) => {
    setChatHistory((prev) => [...prev, { sender, text: message }]);
  };

  const formatText = (text) => {
    return text
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>') // Bold for headings
      .replace(/_(.*?)_/g, '<em>$1</em>') // Italics for subheadings
      .replace(/•/g, '<li>') // Bullet points
      .replace(/\n/g, '<br>'); // Line breaks
  };

  const getBotResponse = async (userMessage) => {
    const updatedHistory = [
      ...chatHistory,
      { sender: 'user', text: userMessage },
    ];
    const conversationHistory = updatedHistory
      .map((entry) => `${entry.sender}: ${entry.text}`)
      .join('\n');

    try {
      const result = await model.generateContent(conversationHistory);
      const response = await result.response;
      const text = await response.text();
      appendMessage('bot', formatText(text));
    } catch (error) {
      console.error('Error:', error);
      appendMessage('bot', 'Sorry, something went wrong.');
    }
  };

  const sendInitialMessage = async () => {
    const initialMessage = `*Hello!* Please start the conversation directly by asking interview questions and also rate the answer typed by the user and then ask the next question. Also, first of all, ask for the role the user wants to give an interview for.`;
    try {
      const result = await model.generateContent(initialMessage);
      const response = await result.response;
      const text = await response.text();
      appendMessage('bot', formatText(text));
    } catch (error) {
      console.error('Error:', error);
      appendMessage('bot', 'Sorry, something went wrong.');
    }
  };

  const handleSend = () => {
    if (userMessage.trim()) {
      const additionalText =
        '. Rate my answer, tell me how can I improve the answer and ask the next question.';
      const messageToSend = userMessage + additionalText;
      appendMessage('user', userMessage);
      setUserMessage('');
      getBotResponse(messageToSend);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-900 pt-5 pb-5">
      <div className=" chatbot-container flex flex-col w-full max-w-3xl bg-gray-800 rounded-lg shadow-lg border border-gray-700 mx-4 md:mx-8 lg:mx-16">
        <header className="chatbox-header bg-gray-700 p-4 rounded-t-lg border-b border-gray-600">
          <h1 className="text-2xl font-bold text-white">Ask Me!</h1>
        </header>
        <div
          className="chatbox flex-1 overflow-auto p-4 bg-gray-900"
          ref={chatBoxRef}
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender} my-2 p-3 rounded-lg max-w-[80%] break-words ${msg.sender === 'bot'
                ? 'bg-gray-700 text-white self-start'
                : 'bg-indigo-600 text-white self-end'
                }`}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ))}
        </div>
        <div className="chat-input-container bg-gray-700 p-4 flex items-center border-t border-gray-600 rounded-b-lg">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="chat-input flex-1 p-2 rounded-l-lg bg-gray-800 text-white outline-none focus:ring focus:ring-indigo-500"
            placeholder="Type a message..."
          />
          <button
            className="chat-send bg-indigo-600 text-white p-2 rounded-r-lg ml-2 hover:bg-indigo-500"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
