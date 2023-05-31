import React, { useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';

export default function ChatPage() {
    const messagesRef = useRef<HTMLUListElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const socket = useRef<SocketIOClient.Socket | null>(null);
  
    useEffect(() => {
      socket.current = io();
  
      const handleChatMessage = (msg: string) => {
        const item = document.createElement('li');
        item.textContent = msg;
        if (messagesRef.current) {
          messagesRef.current.appendChild(item);
          window.scrollTo(0, document.body.scrollHeight);
        }
      };
  
      if (socket.current) {
        socket.current.on('chat message', handleChatMessage);
      }
  
      return () => {
        if (socket.current) {
          socket.current.off('chat message', handleChatMessage);
        }
      };
    }, []);
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (inputRef.current && inputRef.current.value && socket.current) {
        socket.current.emit('chat message', inputRef.current.value);
        inputRef.current.value = '';
      }
    };
  
  return (
    <div>
      <ul id="messages" ref={messagesRef}></ul>
      <form id="form" onSubmit={handleSubmit} ref={formRef}>
        <input id="input" autoComplete="off" ref={inputRef} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
