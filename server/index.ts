import express from "express"
import dotenv from "dotenv"
import http from "http"
import cors from "cors"
import socket from "socket.io"
dotenv.config()


const app=express()
const Server=new http.Server(app)
const socketIO=new socket.Server(Server,{cors:{origin:["http://192.168.87.171:3001","http://localhost:3001"],credentials:true}})
const PORT=4000;
app.use(cors({origin:["http://192.168.87.171:3001/","http://localhost:3001"],credentials:true}))

socketIO.on("connection",socket=>{
    socket.join("1")
    socket.on("text-change",(data)=>{
        console.log(data)
        socket.to("1").emit("receive-text",data)
    })
})




Server.listen(PORT,()=>console.log("server started at "+PORT))