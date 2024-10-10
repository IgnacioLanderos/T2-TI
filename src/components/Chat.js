import React, { useState } from 'react';

const Chat = ({ messages, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="overflow-y-auto flex-grow space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md ${msg.level === 'warn' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-800'}`}
          >
            <strong>{msg.name}</strong> ({new Date(msg.date).toLocaleTimeString()}): {msg.content}
          </div>
        ))}
      </div>

      <div className="mt-2 flex space-x-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Chat;
