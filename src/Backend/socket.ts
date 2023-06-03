import express, { json } from "express";
import http from "http";
import { emit } from "process";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const chatHistory: string[] = [];
app.use(express.static("dist"));

io.on("connection", (socket: Socket) => {
  socket.on("chat message", (msg: any) => {
    let userNames = ["Ada", "Marvel", "Daniel", "Henry", "Kate"];
    function hashCode(str: string) {
      return str
        .split("")
        .reduce(
          (prevHash: number, currVal: string) =>
            ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0,
          0
        );
    }
    msg = userNames[Math.abs(hashCode(socket.id)) % 5] + " " + msg;
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
