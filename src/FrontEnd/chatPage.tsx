import React, { useEffect, useRef } from "react";
import io, { Socket } from "socket.io-client";
import { Button, Form } from "react-bootstrap";
import DP from "../img/dp.jpg";
import SendIcon from "@mui/icons-material/Send";

export default function ChatPage() {
  const messagesRef = useRef<HTMLUListElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const socket = useRef<SocketIOClient.Socket | null>(null);

  useEffect(() => {
    socket.current = io();

    const handleChatMessage = (msg: string) => {
      const item = document.createElement("div");
      item.textContent = msg;
      if (messagesRef.current) {
        messagesRef.current.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
      }
    };

    if (socket.current) {
      socket.current.on("chat message", handleChatMessage);
    }

    return () => {
      if (socket.current) {
        socket.current.off("chat message", handleChatMessage);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value && socket.current) {
      socket.current.emit("chat message", inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  return (
    <div className="chatUI">
      <div className="headChat">
        <img src={DP} alt="Image" className="HomeImg" />
        <h3>Marvel's Group Chat </h3>
      </div>
      <div className="chatArea">
        <ul id="messages" ref={messagesRef}></ul>
      </div>
      <form
        id="form"
        onSubmit={handleSubmit}
        ref={formRef}
        className="form-group"
      >
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">Chat Here</span>
          </div>
          <textarea
            className="form-control"
            aria-label="With textarea"
            id="input"
            autoComplete="off"
            ref={inputRef}
          ></textarea>
          <Button className="btn btn-dark" type="submit">
            <SendIcon />
          </Button>
        </div>
      </form>
    </div>
  );
}
