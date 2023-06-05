import React from "react";
import ChatPage from "./chatPage";
import UserForm from "./UserForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/chatpage" element={ <ChatPage />} />
      {/* <ChatPage /> */}
    </Routes>
  );
}
