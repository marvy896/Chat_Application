import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";
import { Button, Form } from "react-bootstrap";
/**@ts-ignore */
import DP from "../img/dp.jpg";
import SendIcon from "@mui/icons-material/Send";
import { DisplayMessage } from "../utilis/interface";
import { useParams } from "react-router-dom";

export default function ChatPage() {
  // const formRef = useRef<HTMLFormElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const socket = useRef<Socket | null>(null);
  const [items, setItems] = useState<Array<DisplayMessage>>([]);

  useLayoutEffect(() => {
    setTimeout(() => {
      ulRef.current?.scrollTo(0, ulRef.current.scrollHeight);
    }, 100);
  }, [items]);

  let urlRoomId = useParams().id;
  const handleChatMessage = (msg: DisplayMessage, UrlRoomId: string) => {
    if (urlRoomId == UrlRoomId) {
      setItems((prevItems) => [...prevItems, msg]);
    }
  };

  const handleChatHistory = (msg: DisplayMessage[]) => {
    setItems(msg);
    ulRef.current?.scrollTo(0, ulRef.current.scrollHeight);
  };

  useEffect(() => {
    socket.current = io();

    if (socket.current) {
      socket.current.on("chat message", handleChatMessage);
      socket.current.on("chat history", handleChatHistory);
      socket.current.emit("currentRoom", urlRoomId);
    }

    return () => {
      if (socket.current) {
        socket.current.off("chat message", handleChatMessage);
        socket.current.off("chat history", handleChatHistory);
      }
    };
  }, [urlRoomId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current && inputRef.current.value && socket.current) {
      socket.current.emit("chat message", inputRef.current.value, urlRoomId);
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
        <ul id="messages">
          {" "}
          {items.map((item, index) => (
            <div className="diplayMsg" key={index}>
              <span className="username">{item.username}</span> {item.message}
            </div>
          ))}
        </ul>
      </div>
      <Form id="form" onSubmit={handleSubmit} className="form-group">
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
      </Form>
    </div>
  );
}
