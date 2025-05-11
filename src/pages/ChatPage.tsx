import React from 'react';
import ChatInterface from '../components/ChatInterface';

const ChatPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Chat with Event Assistant</h1>
      
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Chat with our AI assistant to discover events, set your preferences, or ask questions. Try these example prompts:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4 bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200">
            <p className="font-medium">"I like jazz concerts and outdoor festivals"</p>
          </div>
          
          <div className="card p-4 bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200">
            <p className="font-medium">"Set my city to San Francisco"</p>
          </div>
          
          <div className="card p-4 bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200">
            <p className="font-medium">"Can you recommend some events for me?"</p>
          </div>
          
          <div className="card p-4 bg-gray-50 dark:bg-gray-800/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200">
            <p className="font-medium">"Tell me about how notifications work"</p>
          </div>
        </div>
      </div>
      
      <ChatInterface />
    </div>
  );
};

export default ChatPage;