import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className=" px-4 py-2 lg:px-6 flex items-center justify-between bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800  border-b">
        <div className="flex items-center space-x-2 ">
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
         <Link href={"/"}> <span className="font-semibold text-lg text-white">DocSync</span></Link>
        </div>
      </header>
  )
}

export default Navbar