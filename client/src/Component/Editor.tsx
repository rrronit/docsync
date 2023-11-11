"use client";
import React, { useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { RangeStatic } from "quill";
import { useParams, useSearchParams } from "next/navigation";

const Editor = () => {
  const params = useParams();
  const { quill, quillRef } = useQuill({ theme: "snow" });
  const socket = io("http://localhost:4000");
  let cursor: RangeStatic | undefined | null;

  useEffect(() => {
    const handleTextChange = () => {
      cursor = quill?.getSelection();

      socket.emit("text-change", quill?.getContents());
    };

    if (quill) {
      quill.on("text-change", handleTextChange);

      socket.on("receive-text", (data) => {
        quill.off("text-change", handleTextChange);

        quill.setContents(data);

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
      
      quill?.setContents(content)

  });
  });
  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
