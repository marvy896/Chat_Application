import express, { json } from "express";
import http from "http";
import { emit } from "process";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const chatHistory: string[] = [];
app.use(express.static("dist"));

let users: Record<string, string> = {};
let userNames = ["Ada", "Marvel", "Daniel", "Henry", "Kate"];

io.on("connection", (socket: Socket) => {
  if (users[socket.id] == undefined) {
    let used = userNames.pop()!;
    users[socket.id] = used;
    console.log(used);
  }
  socket.on("chat message", (msg: any) => {
    msg =users[socket.id] + " " + msg;
    io.emit("chat message", msg);
    chatHistory.push(msg);
  });
  socket.emit("chat history", JSON.stringify(chatHistory));
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
