"use client";
import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { RangeStatic } from "quill";
import { useRouter, useParams } from "next/navigation";

const Editor = () => {
  const params = useParams();
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("");
  const { quill, quillRef } = useQuill({ theme: "snow" });

  const socket = io("https://docsync-1rf1.onrender.com");
  let cursor: RangeStatic | undefined | null;

  useEffect(() => {
    const handleTextChange = () => {
      cursor = quill?.getSelection();
      const document = {
        id: params.docsID,
        title,
        content: quill?.getContents(),
      };
      socket.emit("text-change", document);
    };

    socket.on("connect", () => {
      const id = params.docsID;

      const allDocs:{
        id: string,
        title: string,
        createdAt: string
      }[]= JSON.parse(localStorage.getItem("docs") as string) || []
      const current=allDocs.filter(data=>data.id===id) 
      if (current.length===0){
        const newDoc={
          id,
          title,
          createdAt:new Date().toLocaleString()
        }
        const updatedList = [newDoc,...allDocs]
        localStorage.setItem("docs", JSON.stringify(updatedList))

      }
      socket.emit("join-room", id);
    });

    if (quill) {
      quill.on("text-change", handleTextChange);

      socket.on("receive-text", (data) => {
        quill.off("text-change", handleTextChange);

        quill.setContents(data.content);

        quill?.setSelection(cursor as RangeStatic);

        quill.on("text-change", handleTextChange);
      });
    }

    return () => {
      if (quill) {
        quill.off("text-change", handleTextChange);
      }
      socket.disconnect();
    };
  }, [quill, params.docsID, title,loading]);

  useEffect(() => {
    const fetchData = async () => {
   
      await fetch(`/api/document/` + params.docsID).then(async res => {
        if (!res.ok) {
          router.replace("/");
        } else {
          const { id, title, content } = await res.json();
          setTitle(title);
          quill?.setContents(content);
          setLoading(false)
        }
      });
    }

    fetchData();
  }, [params.docsID, quill]);
  return (
    <div className="text-white px-5">
      
      <div className="grid justify-center pt-5 h-[85vh]">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="bg-gray-800 p-4 rounded-md">
            <center><h2>{title}</h2></center>
            <div ref={quillRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;