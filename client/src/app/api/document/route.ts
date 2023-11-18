import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req:NextRequest)=>{
    let redis;
    if (process.env.REDIS_TOKEN && process.env.REDIS_URL) {
      redis = new Redis({
        url: process.env.REDIS_URL,
        token: process.env.REDIS_TOKEN,
      });
    }
    const {title}=await req.json()
    const doc=await prisma.document.create({data:{
        id:randomUUID() as string,
        title:title,
        content:"",
    }})
    await redis?.set(doc.id, JSON.stringify(doc));

    return NextResponse.json({...doc})
    





}
