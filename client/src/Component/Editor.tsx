"use client"
import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';

const Editor = () => {
  const { quill, quillRef } = useQuill({ theme: 'snow' });
  const socket = io('http://192.168.87.171:4000');
  let cursor:any;
  

  useEffect(() => {
    const handleTextChange = () => {
     
        cursor=quill?.getSelection()

        socket.emit('text-change', quill?.getContents());
    
    };

    if (quill) {
      quill.on('text-change', handleTextChange);


      socket.on('receive-text', (data) => {
        quill.off('text-change', handleTextChange);

        quill.setContents(data);


        quill?.setSelection(cursor)

        quill.on('text-change', handleTextChange);
      });
    }

    return () => {
      if (quill) {
        quill.off('text-change', handleTextChange);
      }
      socket.disconnect();
    };
  }, [quill]);

  return (
    <div>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
