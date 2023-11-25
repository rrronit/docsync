interface docType{
  id:string;
  title:string;
  content:any
}

import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import socket from "socket.io";
import { Redis } from "@upstash/redis";
import prisma from "./prisma/prisma";

dotenv.config();

let redis: Redis | null = null;
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
    origin: "https://docsync.vercel.app",
    credentials: true,
  },
});

const PORT = 4000;
app.use(
  cors({

    origin: "https://docsync.vercel.app",
    
    credentials: true,
  })
);

const rooms: Map<string, string[]> = new Map();

socketIO.on("connection", (socket) => {
  socket.on("join-room", (id) => {
    socket.join(id);
    const users = rooms.get(id) || [];
    users.push(socket.id);
    rooms.set(id, users);
  });

  socket.on("text-change", async (data) => {
    socket.to(data.id).emit("receive-text", data);
    if (redis) await redis.set(data.id, JSON.stringify(data));
  });
  socket.on("disconnect", () => {
 
    rooms.forEach(async(room,id) => {
      rooms.set(id,room.filter((user) => user !== socket.id));
      if (room.length==0){
        const doc:docType=await redis?.get(id) || {id:"",title:"",content:""}
        
        await prisma.document.update({
          where:{
            id:id
          },
          data:{
            content:JSON.stringify(doc.content)
          }
        }) 

        await redis?.expire(id,30)
      }
    }); 
  });
});
Server.listen(PORT, () => console.log("server started at " + PORT));
