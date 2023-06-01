import express, { json } from "express";
import http from "http";
import { emit } from "process";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("dist"));

io.on("connection", (socket: Socket) => {
  socket.on("chat message", (msg: any) => {
    io.emit("chat message", msg);
  });
  socket.emit("chat history", JSON.stringify(["helloo"]));
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
