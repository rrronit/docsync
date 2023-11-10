import express from "express"
import dotenv from "dotenv"
import http from "http"
import socket from "socket.io"
dotenv.config()

const app=express()
const Server=new http.Server(app)
const socketIO=new socket.Server(Server)
const PORT=4000;




app.get("/",(req,res)=>{
    
    res.send("from server")
})


Server.listen(PORT,()=>console.log("server started at "+PORT))