import React, { useState, useEffect, useRef } from 'react';
// Assuming you have already configured the GoogleGenerativeAI instance
import { GoogleGenerativeAI } from '@google/generative-ai';

//const API_KEY = 'AIzaSyDVNSZROUYG9rwQcCIm28AhjWpyCAHrWnI';
// const apiKey = "AIzaSyCxd0z042alMBmwX97IdfnsiKBvILBOfA8";


const apiKey = "AIzaSyAFQFy8UcXbM6uJH_e3Ku2CEJ_axaWML8Q";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-002' });

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const initialMessageSent = useRef(false);

  useEffect(() => {
    if (!initialMessageSent.current) {
      sendInitialMessage();
      initialMessageSent.current = true;
    }
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: 'smooth',
      });
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
    setLoading(true); // Show typing animation
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
    } finally {
      setLoading(false); // Hide typing animation
    }
  };

  const sendInitialMessage = async () => {
    const initialMessage = "Hello! Please start the conversation directly by greeting and saying thanks for choosing InterviewMate and here you can ask me any question of interview  and give different option like u want to ask techincal question or behavioral etc ..I will try my best to give the best possble answer. Just give the best possible answer nothing more for interview purpose only. ";
    setLoading(true); // Show typing animation
    try {
      const result = await model.generateContent(initialMessage);
      const response = await result.response;
      const text = await response.text();
      appendMessage('bot', formatText(text));
    } catch (error) {
      console.error('Error:', error);
      appendMessage('bot', 'Sorry, something went wrong.');
    } finally {
      setLoading(false); // Hide typing animation
    }
  };

  const handleSend = () => {
    if (userMessage.trim()) {
      const additionalText = ". Give me the best answer for this question if it is asked in an interview.";
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
    <div className="flex items-start justify-center h-screen bg-gray-900 pt-5 pb-1">
      <div className="chatbot-container flex flex-col w-full max-w-3xl min-h-[100%] max-h-[100%] bg-gray-800 rounded-none sm:rounded-lg shadow-lg border border-gray-700 mx-1 sm:mx-4 md:mx-8 lg:mx-16">
        <header className="chatbox-header bg-gray-700 p-4 rounded-none sm:rounded-t-lg border-b border-gray-600 sticky top-0">
          <h1 className="text-2xl font-bold text-white">Ask Me!</h1>
        </header>
        <div
          className="chatbox flex-1 p-4 bg-gray-900"
          ref={chatBoxRef}
          style={{
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            scrollbarColor: '#4a5568 #2d3748',
          }}
        >
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === 'bot' ? 'justify-start' : 'justify-end'
              } my-2`}
            >
              <div
                className={`chat-message ${msg.sender} p-3 rounded-lg max-w-[90%] sm:max-w-[80%] break-words ${
                  msg.sender === 'bot'
                    ? 'bg-gray-700 text-white'
                    : 'bg-indigo-600 text-white'
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </div>
          ))}
          {loading && (
            <div className="flex justify-start my-2">
              <div className="p-3 rounded-lg bg-gray-700 text-white">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-[pulse_1s_ease-in-out_infinite]" />
                  <span className="w-2 h-2 bg-white rounded-full animate-[pulse_1s_ease-in-out_0.333s_infinite]" />
                  <span className="w-2 h-2 bg-white rounded-full animate-[pulse_1s_ease-in-out_0.667s_infinite]" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="chat-input-container bg-gray-700 p-4 flex items-center border-t border-gray-600 sticky bottom-0">
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
