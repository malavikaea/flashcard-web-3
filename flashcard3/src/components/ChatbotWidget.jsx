import React, { useState, useEffect, useRef } from 'react';
import './ChatbotWidget.css';
import axios from 'axios';


const ChatbotWidget = () => {

useEffect(() => {
  console.log("✅ ChatbotWidget mounted");
}, []);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi there! Need help with your flashcards?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping ) return;

    const userMsg = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

     try {
    const response = await axios.post('http://localhost:5000/api/gemini/chat', {
      prompt: userMsg.text
    });

    const botReply = {
      sender: 'bot',
      text: response.data.reply || 'Sorry, I didn’t get that.'
    };

    setMessages((prev) => [...prev, botReply]);
  } catch (err) {
    console.error('Error talking to Gemini:', err);
    setMessages((prev) => [...prev, {
      sender: 'bot',
      text: '⚠️ Oops! Something went wrong while connecting to my brain (Gemini API).'
    }]);
  }

  setIsTyping(false);
    // Simulate bot reply
    // setTimeout(() => {
    //   const botReply = {
    //     sender: 'bot',
    //     text: `You said: "${userMsg.text}". I'm still learning, but I'm here to help!`
    //   };
    //   setMessages((prev) => [...prev, botReply]);
    //   setIsTyping(false);
    // }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot-container">
      <button className="chat-toggle" onClick={toggleChat}>
        🤖
      </button>

      {isOpen && (
            <div className="chat-window">
                <button className="close-btn" onClick={toggleChat}>×</button> {/* Move here */}

                <div className="chat-messages">
                {messages.map((msg, idx) => (
                    <div className={`message ${msg.sender}`} key={idx}>
                    <div className="avatar">
                        {msg.sender === 'bot' ? '🤖' : '👤'}
                    </div>
                    <div className="bubble">{msg.text}</div>
                    </div>
                ))}
                {isTyping && (
                    <div className="typing">🤖 Typing...</div>
                )}
                <div ref={messagesEndRef} />
                </div>

                <div className="chat-input">
                <input
                    type="text"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        )}

    </div>
  );
};

export default ChatbotWidget;