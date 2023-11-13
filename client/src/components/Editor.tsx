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
  const socket = io("http://192.168.24.171:4000");
  let cursor: RangeStatic | undefined | null;

  useEffect(() => {
    const handleTextChange = () => {
      console.log(quill?.getContents())
      cursor = quill?.getSelection();
      const document = {
        id: params.docsID,
        title,
        content: quill?.getContents(),
      };
      socket.emit("text-change", document);
    };

    socket.on("connect", () => {
      console.log("Connected to the server!");

      const id = params.docsID;
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
  }, [quill, params.docsID, title]);

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
    <div style={{ height: "100vh" }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div ref={quillRef} />
      )}
    </div>
  );
};

export default Editor;
