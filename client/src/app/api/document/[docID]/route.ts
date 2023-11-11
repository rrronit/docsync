import prisma from "@/lib/prisma";
import { Redis } from "@upstash/redis";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export const GET=async(req:NextApiRequest)=>{
  
  const id=(req.url?.split("/").at(5))

  
  let redis;
    if (process.env.REDIS_TOKEN && process.env.REDIS_URL) {
      redis = new Redis({
        url: process.env.REDIS_URL,
        token: process.env.REDIS_TOKEN,
      });
    }
    if (!id)return NextResponse.json({message:"failed"})
     const docInCache=await redis?.get(id)

     if (docInCache){
      console.log("here")
      return NextResponse.json({...docInCache})
    }  
    const doc=await prisma.document.findUnique({
      where:{
        id:id
      }
      
    })
    if (!doc) return NextResponse.json({message:"failed"})
    redis?.set(id,JSON.stringify({...doc}))
  
    
    return NextResponse.json({...doc})
}


