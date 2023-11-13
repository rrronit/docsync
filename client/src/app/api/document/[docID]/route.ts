import prisma from "@/lib/prisma";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const id = req.url?.split("/").at(5);

    if (!id) {
      return NextResponse.json({ message: "Invalid request" });
    }

    let redis;
    if (process.env.REDIS_TOKEN && process.env.REDIS_URL) {
      redis = new Redis({
        url: process.env.REDIS_URL,
        token: process.env.REDIS_TOKEN,
      });
    }

    const docInCache = await redis?.get(id);

    if (docInCache) {
      return NextResponse.json({...docInCache}); 
    }

    const doc = await prisma.document.findUnique({
      where: {
        id: id,
      },
    });

    if (!doc) {
      return NextResponse.json({ message: "Document not found" },{status:403});
    }

    await redis?.set(id, JSON.stringify(doc)); 

    return NextResponse.json(doc);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error" });
  }
};
