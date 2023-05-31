import express from "express";
import http from "http";
import { emit } from "process";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

app.use(express.static("dist"));

io.on('connection', (socket) => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


server.listen(3000, () => {
  console.log("listening on *:3000");
});
