import express, { json } from "express";
import http from "http";
import { emit } from "process";
import { Server, Socket } from "socket.io";
import { DisplayMessage } from "../utilis/interface";

const app = express();
const server = http.createServer(app);
app.use(express.json());
const io = new Server(server);
const chatHistory: DisplayMessage[] = [];
app.use(express.static("dist"));

let users: Record<string, string> = {};
let userNames = ["Ada", "Marvel", "Daniel", "Henry", "Kate"];

app.post("/user", (req, res) => {
  let user = req.body.username;

  for (const userName of Object.values(users)) {
    if (user == userName) {
      console.log(user + "" + "is not unique");
      return res.json("USER is not unique");
    }
  }
  console.log(user + " " + "is unique");
  userNames.push(user)
  return res.json("USER is unique");
});

io.on("connection", (socket: Socket) => {
  if (users[socket.id] == undefined) {
    let used = userNames.pop()!;
    users[socket.id] = used;
    console.log(used);
  }
  socket.on("chat message", (msg: string) => {
    // msg = users[socket.id] + " " + msg;
    if (users[socket.id] == undefined) {
      throw new Error("user not found");
    }
    const display: DisplayMessage = {
      username: users[socket.id]!,
      message: msg,
    };
    io.emit("chat message", display);
    chatHistory.push(display);
  });
  socket.emit("chat history", chatHistory);
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
