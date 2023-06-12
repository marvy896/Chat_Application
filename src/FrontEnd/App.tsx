import React from "react";
import ChatPage from "./chatPage";
import UserForm from "./UserForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GroupsInterface from "./groupsInterface";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/index" element={<GroupsInterface />} />
      <Route path="/chatpage/:id" element={<ChatPage />} />
      {/* <ChatPage /> */}
    </Routes>
  );
}
