import { application } from "express";
import React, { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";

export default function UserForm() {
  let [username, setUsername] = useState("");
  let navigate = useNavigate();

  let submit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/user", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data == "USER is not unique"){
          return  alert("Username already in use")
        }
        navigate("/index");
      });
  };
  return (
    <div>
      <Form onSubmit={submit}>
        <h2>Please Enter your User Name</h2>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </InputGroup>
        <Button type= "submit"> Continue</Button>
      </Form>
    </div>
  );
}
