import {io} from "socket.io-client";

const socket = io("ws://localhost:3000");

socket.on("hello", (arg: any) =>{
    console.log(arg);
})

socket.emit("hello", "world")
