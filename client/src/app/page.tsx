"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { useRouter } from "next/navigation";
import Link from "next/link";



interface document {
  id: string;
  title: string;
  createdAt:string
}
export default function Component() {
  const router=useRouter()
  const docs: document[] = JSON.parse(
    localStorage.getItem("docs") as string
  ) || [];

  const [title, setTitle] = useState("");
  const [documents, setDocuments] = useState(docs);
  const handleClick = (e:any) => {
     e.preventDefault()
    fetch("/api/document", {
      method: "post",
      body: JSON.stringify({ title }),
    }).then(async (res) => {
      const data = await res.json();
      const { id, title } = data;
      const newDoc = {
        id,
        title,
        createdAt:new Date().toLocaleString()
      };

      const updatedList=[...documents,newDoc]
      setDocuments(updatedList)
      localStorage.setItem("docs",JSON.stringify(updatedList))
      router.push("/"+id)
     
    });
  };
  return (
    <main
      className="flex flex-col min-h-screen bg-gradient-to-r from-black via-gray-900 to-gray-800 text-white"
    >
      <header className="pt-4 px-4 py-2 lg:px-6 flex items-center justify-between border-b border-gray-900">
        <div className="flex items-center space-x-2">
          <svg
            className=" h-6 w-6 text-white"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="font-semibold text-lg">DocSync</span>
        </div>
      </header>
      <section className="flex flex-col items-center justify-center py-16 lg:py-32 dark:bg-gray-900">
        <h1 className="text-4xl lg:text-6xl text-center font-bold text-white dark:text-gray-50">Collaborate on Documents</h1>
        <p className="mt-4 text-lg lg:text-2xl text-gray-400 max-w-lg text-center dark:text-gray-200">
          Work together with your team on documents in real-time.
        </p>
      </section>
      <section className="container px-4 lg:px-6 py-10 grid md:w-2/5 gap-5">
      <h2 className="text-2xl font-semibold text-center text-white mb-4">Your Documents</h2>
        <div className="flex flex-col items-center p-6 rounded-lg border border-gray-900 bg-gray-700 hover:bg-gray-600 transition-all ease-in-out transform ">
          <svg
            className=" h-10 w-10 mb-4 text-white"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
          <Popover>
      <PopoverTrigger asChild>
        <Button variant="default" className="hover:scale-105">Add New Document</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 h-[9.5rem] bg-white -translate-y-32 dark:bg-gray-800 rounded-lg">
      <form>
        <h4 className="text-lg font-bold mb-2">Document Title</h4>
        <input
          aria-label="Document title input box"
          className="w-full mb-2 p-2 border border-gray-300 rounded-lg focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Enter document title"
          type="text"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <Button onClick={(e)=>handleClick(e)} className="w-full" variant="default">
          Create
        </Button>
        </form>
      </PopoverContent>
    </Popover>
        </div>
        {documents?.map(document=>{
          return(
            <Link href={document.id}>
            <div className="flex flex-col items-center p-6 rounded-lg border border-gray-900 bg-gray-700 hover:bg-gray-600 transition-all ease-in-out transform hover:scale-105">
            <svg
              className=" h-10 w-10 mb-4 text-white"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">{document.title}</h3>
            <p className="text-sm text-gray-400">Created on {document.createdAt}</p>
          </div>
          </Link>
          )
        })}
       
      </section>
    
    </main>
  )
}

