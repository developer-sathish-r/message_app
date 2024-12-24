import React, { useEffect, useState, useRef } from 'react';
import ChatBar from './chatBar/ChatBar';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState('');
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    socket.on('typingResponse', (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat">
      <ChatBar socket={socket}
        messages={messages}
        typingStatus={typingStatus}
        lastMessageRef={lastMessageRef}
      />
    </div>
  );
};

export default ChatPage;