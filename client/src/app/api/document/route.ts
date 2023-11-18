import prisma from "@/lib/prisma";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const POST=async(req:NextRequest)=>{

    const {title}=await req.json()
    const doc=await prisma.document.create({data:{
        id:randomUUID() as string,
        title:title,
        content:"",
    }})
    await redis?.set(doc.id, JSON.stringify(doc));

    return NextResponse.json({...doc})
    





}
