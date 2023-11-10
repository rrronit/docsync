"use client"
import React, { useRef, useEffect } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; // Import Quill styles

const Editor = () => {
  const { quill, quillRef } = useQuill({theme:"snow",});

  useEffect(() => {
    if (quill) {
      
    }
  }, [quill]); // Make sure to include quill as a dependency to avoid unnecessary re-renders

  return (
    <div className='' style={{ height:"100vh", width:"80vw",backgroundColor: 'white',color:"black" }}>
      <div ref={quillRef} />
    </div>
  );
};

export default Editor;
