"use client";
import { useState, useRef, useEffect } from 'react';

export default function MainChat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch('http://localhost:4000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setMessages([...newMessages, data.response]);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div
    className="flex flex-1 justify-center items-center p-4 mainbg bg-cover bg-center bg-no-repeat"
  >
    {/* Outer container with a fixed height */}
    <div className="w-full max-w-3xl rounded-lg shadow-lg flex flex-col h-[80vh] coffee bg-opacity-80">
      
      {/* Header or Title Section */}
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-center">MealMind</h1>
        <p className="text-center text-black mt-2 text-sm">
          Ask for a recipe or meal suggestion! Describe your dietary preferences, ingredients, or cuisine type.
        </p>
      </div>
        
        {/* Messages Area: Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <div key={idx} className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`${isUser ? 'slate text-black' : 'ceramic text-black'} px-4 py-2 rounded-lg max-w-md whitespace-pre-wrap`}>
                  {msg.content}
                </div>
              </div>
            );
          })}
          <div ref={chatEndRef}></div>
        </div>
        
        {/* Loading Indicator */}
        {loading && (
          <div className="absolute bottom-24 right-6 text-gray-600 text-sm flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-t-2 border-gray-500 rounded-full animate-spin"></div>
            <span>Loading...</span>
          </div>
        )}

        {/* Input Area: Fixed at the bottom of container */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 latte flex">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your request here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Asking...' : 'Ask'}
          </button>
        </form>
      </div>
    </div>
  );
}
