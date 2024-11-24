import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(history));
  }, [history]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const timestamp = new Date().toISOString();
    const userMessage = { text: input, sender: 'user', timestamp };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post('http://localhost:8000/chatbot/chatbot', {
        query: input,
      });

      const botResponse = {
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error('Error communicating with backend:', error);
      const errorMessage = {
        text: 'Something went wrong. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput('');
  };

  const saveCurrentChat = () => {
    if (messages.length === 0) return;
    const newHistory = [
      ...history,
      { id: history.length + 1, messages, createdAt: new Date().toISOString() },
    ];
    setHistory(newHistory);
    setMessages([]);
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
      <div className="w-1/4 bg-[#183473] text-white p-4 space-y-6 overflow-y-auto">
        <h2 className="text-lg font-bold">Chat History</h2>
        <button
          onClick={saveCurrentChat}
          className="w-full py-2 bg-white text-[#183473] rounded hover:bg-gray-200"
        >
          + New Chat
        </button>
        <div className="mt-4 space-y-4">
          {history.map((session, index) => (
            <button
              key={index}
              className="block w-full text-left p-2 mt-1 bg-[#f0f4ff] text-[#183473] rounded hover:bg-[#e0efff]"
              onClick={() => setMessages(session.messages)}
            >
              Chat {session.id} - {formatDate(session.createdAt)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <span
                className={`inline-block p-3 rounded-md ${msg.sender === 'user' ? 'bg-[#183473] text-white' : 'bg-[#f0f4ff] text-[#183473]'}`}
                style={{ maxWidth: '75%' }}
              >
                {msg.sender === 'bot' ? (
                  <ReactMarkdown className="chat-markdown">{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center py-4 border-t bg-[#eff0f1]">
          <div className="flex items-center w-[50%] bg-white rounded-md border-2 border-black">
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
