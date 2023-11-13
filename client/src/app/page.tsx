
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Component() {
  return (
    <main
      key="1"
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
        <h1 className="text-4xl lg:text-6xl font-bold text-white dark:text-gray-50">Collaborate on Documents</h1>
        <p className="mt-4 text-lg lg:text-2xl text-gray-400 max-w-lg text-center dark:text-gray-200">
          Work together with your team on documents in real-time.
        </p>
      </section>
      <section className="container px-4 lg:px-6 py-16 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="flex flex-col items-center p-6 rounded-lg border border-gray-900 bg-gray-700">
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
          <Button className="mt-6 px-8 py-3 bg-white hover:bg-gray-100 text-gray-900 font-medium">
            Add New Document
          </Button>
        </div>
        <div className="flex flex-col items-center p-6 rounded-lg border border-gray-900 bg-gray-700">
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
          <h3 className="text-xl font-semibold mb-2">Document Title</h3>
          <p className="text-sm text-gray-400">Created on Date</p>
        </div>
      </section>
      <footer className="px-4 py-6 lg:px-6 flex items-center justify-between border-t border-gray-900">
        <p className="text-sm text-gray-400">© 2023 DocSync. All rights reserved.</p>
        <nav className="flex items-center space-x-4">
          <Link className="text-sm hover:underline" href="#">
            Privacy Policy
          </Link>
          <Link className="text-sm hover:underline" href="#">
            Terms of Service
          </Link>
          <Link className="text-sm hover:underline" href="#">
            Contact Us
          </Link>
        </nav>
      </footer>
    </main>
  )
}

