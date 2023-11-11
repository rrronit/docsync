"use client";
import { useState } from "react";

interface document {
  id: string;
  title: string;
}

const Page = () => {
  const docs: document[] | null = JSON.parse(
    localStorage.getItem("docs") as string
  );

  const [title, setTitle] = useState("");
  const [documents, setDocuments] = useState(docs);
  const handleClick = () => {
    fetch("/api/document", {
      method: "post",
      body: JSON.stringify({ title }),
    }).then(async (res) => {
      const data = await res.json();
      const { id, title } = data;
      const newDoc = {
        id,
        title,
      };
      if (docs) {
        docs.push(newDoc);
        localStorage.setItem("docs", JSON.stringify(docs));
      } else {
        localStorage.setItem("docs", JSON.stringify([newDoc]));
      }
    });
  };
  return (
    <div>
      <input
        style={{ color: "red" }}
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleClick}>ADD DOCUMENT</button>
      {documents &&
        documents.map((docs) => {
          return <>
          <div className="m-3">
          <a href={`docs/${docs.id}`}>{docs.title}</a>
          </div>
          </>;
        })}
    </div>
  );
};

export default Page;
