import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import socket from "socket.io";
import { Redis } from "@upstash/redis";
dotenv.config();

let redis: Redis | null=null;
if (process.env.REDIS_TOKEN && process.env.REDIS_URL) {
  redis = new Redis({
    url: process.env.REDIS_URL,
    token: process.env.REDIS_TOKEN,
  });
}
const app = express();
const Server = new http.Server(app);
const socketIO = new socket.Server(Server, {
  cors: {
    origin: ["http://192.168.14.171:3000", "http://localhost:3000"],
    credentials: true,
  },
});
const PORT = 4000;
app.use(
  cors({
    origin: ["http://192.168.14.171:3000/", "http://localhost:3000"],
    credentials: true,
  })
);
socketIO.on("connection", (socket) => {
  socket.join("1");
  socket.on("text-change",async (data) => {
 console.log(data.content)
   if (redis) await redis.set(data.id,JSON.stringify(data))  
    socket.to("1").emit("receive-text", data);
  });
});

Server.listen(PORT, () => console.log("server started at " + PORT));
