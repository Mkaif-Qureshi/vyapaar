import React, { useState, useEffect } from 'react';
import { FaArrowUp, FaUpload, FaTimes } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import { Comment } from 'react-loader-spinner';
import axios from 'axios';
import remarkGfm from 'remark-gfm'; // Import the plugin for GFM support
import "./chat.css"

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedAction, setSelectedAction] = useState('');

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

    const userMessage = { text: input, sender: 'user', timestamp: new Date().toISOString() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/chatbot/chatbot', {
        query: input,
      });

      const botMessage = {
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with backend:', error);
      const errorMessage = {
        text: 'Something went wrong. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleAction = async () => {
    if (!uploadedFile || !selectedAction) return;

    const userMessage = {
      text: `Performing ${selectedAction} on file: ${uploadedFile.name}`,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('action', selectedAction);

    try {
      const response = await axios.post('http://localhost:8000/chatbot/document', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const botMessage = {
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error processing the document:', error);
      const errorMessage = {
        text: 'Error processing the document. Please try again.',
        sender: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setUploadedFile(null);
      setSelectedAction('');
    }
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
    <div className="h-[87vh] flex ">
      <div className="w-1/9 bg-[#183473] text-white p-4 space-y-6 overflow-y-auto">
        <h2 className="text-lg font-bold">Chat History</h2>
        <button
          onClick={() => {
            setMessages([]);
            setUploadedFile(null);
            setSelectedAction('');
          }}
          className="w-full py-2 bg-white text-[#183473] rounded hover:bg-gray-200"
        >
          + New Chat
        </button>
      </div>

      <div className="flex-1 flex flex-col bg-white pt-20">
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`my-2 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <span
                className={`inline-block p-3 rounded-md ${msg.sender === 'user' ? 'bg-[#183473] text-white' : 'bg-[#f0f4ff] text-[#183473]'
                  }`}
                style={{ maxWidth: '75%' }}
              >
                {msg.sender === 'bot' ? (
                  <ReactMarkdown children={msg.text} remarkPlugins={[remarkGfm]} />
                ) : (
                  msg.text
                )}
              </span>
            </div>
          ))}
          {loading && (
            <div className="my-2 flex justify-start ">
              <span className="inline-block p-2 rounded-md bg-[#f0f4ff] text-[#183473] ">
                <Comment
                  visible={true}
                  height="40"
                  width="50"
                  color="#183473"
                  backgroundColor="#f0f4ff"
                  ariaLabel="comment-loading"
                  wrapperStyle={{}}
                  wrapperClass="comment-wrapper"
                />
              </span>
            </div>
          )}
        </div>

        <div className="py-4 border-t bg-[#eff0f1] flex items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            {uploadedFile && (
              <div className="flex items-center space-x-2">
                <span className="text-sm">{uploadedFile.name}</span>
                <FaTimes
                  className="text-red-500 cursor-pointer"
                  onClick={() => setUploadedFile(null)}
                />
              </div>
            )}
            <label className="cursor-pointer flex items-center space-x-2 text-[#183473] hover:text-[#122a5a]">
              <FaUpload size={18} />
              <input type="file" onChange={handleFileUpload} className="hidden" />
            </label>
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Select an action</option>
              <option value="validate">Validate Document</option>
              <option value="risk_analysis">Risk Analysis</option>
              <option value="summarization">Summarization</option>
            </select>
            <button
              onClick={handleAction}
              className="py-2 px-4 bg-[#183473] text-white rounded hover:bg-[#122a5a]"
              disabled={loading || !uploadedFile || !selectedAction}
            >
              Submit
            </button>
          </div>
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && handleSend()}
            className="flex-1 px-4 py-2 focus:outline-none ml-4"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            className={`p-3 text-[#183473] hover:text-[#122a5a] transition ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={loading}
          >
            <FaArrowUp size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
