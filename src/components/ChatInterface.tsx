import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import { useChatStore } from '../stores/chatStore';
import { LLMService } from '../services/llm';

const ChatInterface: React.FC = () => {
  const [message, setMessage] = useState('');
  const { messages, addMessage, isLoading } = useChatStore();
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = message;
    setMessage('');
    
    // Add user message to chat
    addMessage('user', userMessage);
    
    // Process with LLM
    const response = await LLMService.processUserMessage(userMessage);
    
    // Add assistant message to chat
    addMessage('assistant', response);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Initial greeting
  useEffect(() => {
    if (messages.length === 0) {
      addMessage('assistant', 'Hello! I\'m your event assistant. I can help you discover events based on your preferences, recommend events in your city, or notify you about upcoming events. How can I help you today?');
    }
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] md:h-[70vh] rounded-xl shadow-md bg-white dark:bg-gray-800 overflow-hidden">
      <div className="p-4 bg-primary-50 dark:bg-primary-900/30 border-b border-primary-100 dark:border-primary-800">
        <h2 className="text-lg font-semibold text-primary-900 dark:text-primary-100">
          Event Assistant
        </h2>
        <p className="text-sm text-primary-700 dark:text-primary-300">
          Ask questions about events or set your preferences
        </p>
      </div>
      
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`${
                msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-assistant'
              } animate-slide-in mb-2`}
            >
              {msg.content.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < msg.content.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          ))}
          
          {isLoading && (
            <div className="chat-bubble-assistant flex items-center">
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              <span>Thinking...</span>
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center">
          <textarea
            className="input resize-none"
            placeholder="Type your message..."
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button
            className="ml-2 p-3 rounded-lg bg-primary-600 hover:bg-primary-700 text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSendMessage}
            disabled={isLoading || !message.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;