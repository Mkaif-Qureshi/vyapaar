import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  // Load chat history from localStorage when the component mounts
  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory)); // Load chat history from localStorage
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(history));
  }, [history]);

  const handleSend = () => {
    if (!input.trim()) return;

    const timestamp = new Date().toISOString();
    const userMessage = { text: input, sender: 'user', timestamp };
    const botResponse = { text: 'Response from backend...', sender: 'bot', timestamp };

    const updatedMessages = [...messages, userMessage, botResponse];
    setMessages(updatedMessages);
    setInput('');
  };

  const saveCurrentChat = () => {
    if (messages.length === 0) return;

    // Save the current conversation as a new session in history
    const newHistory = [
      ...history,
      { id: history.length + 1, messages, createdAt: new Date().toISOString() },
    ];
    setHistory(newHistory);
    setMessages([]); // Clear current chat messages
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };

  return (
    <div className="h-[87vh] flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-[#183473] text-white p-4 space-y-6 overflow-y-auto">
        <h2 className="text-lg font-bold">Chat History</h2>
        <button
          onClick={saveCurrentChat} // Save the current chat as a new session
          className="w-full py-2 bg-white text-[#183473] rounded hover:bg-gray-200"
        >
          + New Chat
        </button>
        <div className="mt-4 space-y-4">
          {history.map((session, index) => (
            <button
              key={index}
              className="block w-full text-left p-2 mt-1 bg-[#f0f4ff] text-[#183473] rounded hover:bg-[#e0efff]"
              onClick={() => setMessages(session.messages)} // Load selected conversation
            >
              Chat {session.id} - {formatDate(session.createdAt)}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 p-3 rounded-md max-w-[75%] ${
                msg.sender === 'user'
                  ? 'ml-auto bg-[#183473] text-white'
                  : 'mr-auto bg-[#f0f4ff] text-[#183473]'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="flex items-center justify-center py-4 border-t bg-[#f8f9fa]">
          <div className="flex items-center w-[50%] bg-white rounded-md border">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-2 focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="p-3 text-[#183473] hover:text-[#122a5a] transition"
            >
              <FaArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
