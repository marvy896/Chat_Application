import React from "react";
import { Link } from "react-router-dom";

export default function GroupsInterface() {
  return (
    <div className="groupInterface">
      <div className="groupInterface1">
        <h1>Marvels Chat Room</h1>
        <h4>Please choose the Room of your Interests</h4>
      </div>
      <div className="interface">
        <Link to="/chatpage/personal">
          <div className="Link"> Personal Room </div>
        </Link>
        <Link to="/chatpage/business">
          <div className="Link"> Business Room</div>
        </Link>
        <Link to="/chatpage/private">
          <div className="Link"> Private Room </div>
        </Link>
        <Link to="/chatpage/community">
          <div className="Link"> Community Room </div>
        </Link>
      </div>
    </div>
  );
}
