import Editor from "@/Component/Editor";
import React from "react";
import { Redis } from "@upstash/redis";
const  page =async () => {
  let redis;
  if (process.env.REDIS_TOKEN && process.env.REDIS_URL) {
    redis = new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    });
  }
  

  return (
    <div>
      <Editor />
    </div>
  );
};

export default page;
