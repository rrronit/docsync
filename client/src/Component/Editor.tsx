"use client";
import React, { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { RangeStatic } from "quill";
import { useParams, useSearchParams } from "next/navigation";

const Editor = () => {
  const params = useParams();
  const [title, setTitle] = useState("")
  const { quill, quillRef } = useQuill({ theme: "snow" });
  const socket = io("http://192.168.14.171:4000");
  let cursor: RangeStatic | undefined | null;

  useEffect(() => {

    if (quill) {
      quill.on("text-change", function handleTextChange(delta,oldContent,source){

        cursor = quill?.getSelection();
        const document={
          id:params.docsID,
          title,
          content:quill?.getContents()
        }
        
  
        socket.emit("text-change", document);
      });

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
  }, [quill]);

  useEffect(() => {
    fetch(`/api/document/` + params.docsID).then(async (res) =>{
      const {id,title,content}=await res.json()
      setTitle(title)
      
      quill?.setContents(content)

  });
  },[]);
  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
function handleTextChange(){}
