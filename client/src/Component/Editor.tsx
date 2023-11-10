"use client"
import React, { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';
import { RangeStatic } from 'quill';

const Editor = () => {
  const { quill, quillRef } = useQuill({ theme: 'snow' });
  const socket = io('http://192.168.87.171:4000');
  let cursor:any;

  useEffect(() => {
    const handleTextChange = (delta:any, oldDelta:any, source:any) => {
     
        cursor=quill?.getSelection()
        console.log(delta)

        socket.emit('text-change', quill?.getContents());
    
    };

    if (quill) {
      quill.on('text-change', handleTextChange);


      socket.on('some-change-text', (data) => {
        // Temporarily disable 'text-change' event handling while applying changes received from the server
        quill.off('text-change', handleTextChange);


        // Apply the received content
        quill.setContents(data);

        quill?.setSelection(cursor)

        // Re-enable 'text-change' event handling
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
