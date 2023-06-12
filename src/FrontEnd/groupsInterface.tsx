import React from "react";
import { Link } from "react-router-dom";

export default function GroupsInterface() {
  return (
    <div>
      <div className="groupInterface">
        <h1>Marvels Chat Room</h1>
        <h4>Please choose the Room of your Interests</h4>
      </div>
      <div className="interface">
        <Link to="/chatpage/personal">Personal Room</Link>
        <Link to="/chatpage/business">Business Room</Link>
        <Link to="/chatpage/private">Private Room</Link>
        <Link to="/chatpage/community">Community Room</Link>
      </div>
    </div>
  );
}
