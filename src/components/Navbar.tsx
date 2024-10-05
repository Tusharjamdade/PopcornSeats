"use client"
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { ModeToggle } from './component/ModeToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(true);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDarkMode = () => {
    const body = document.querySelector("body");
    console.log("Dark mode function")
    if (body) {
      if (!isChecked) {
        body.classList.add("dark");
      } else {
        body.classList.remove("dark");
      }
    }
    setIsChecked(!isChecked);
  };

//   const handleDownload =  () => {
//     try {
//       axios.get('https://portfolio-backend.tusharnjamdade.workers.dev/downloadpdf/7', {
//         responseType: 'blob', // Important for handling binary data
//       }).then((response)=>{ const blob = new Blob([response.data], { type: 'application/pdf' });
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.setAttribute('download', 'Resume.pdf'); // Filename for the download
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       window.URL.revokeObjectURL(url);})

//       // Clean up
//     } catch (error) {
//       console.error('Error downloading the PDF:', error);
//     }
//   };

  return (
    <nav className="bg-white border-gray-200 dark:bg-black border-b z-10 sticky top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/#home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Popcorn Seats</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {/* <button
            type="button"
            className="mr-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleDownload} // Attach the download handler
          >
            Resume
            <i className="ml-1 fa-solid fa-download "></i>
          </button> */}

          {/* <label className="inline-flex items-center me-5 cursor-pointer">
            <input
              type="checkbox"
              id='checked'
              className="sr-only peer"
              onChange={toggleDarkMode}
            />
            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-800 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-black">
            </div>
          </label> */}
          <ModeToggle/>

          <button
            onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }}
            data-collapse-toggle="navbar-cta"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${mobileMenuOpen ? "" : "hidden"}`} id="navbar-cta">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-black">
            <li>
              <Link href="/#home" onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }} className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500" aria-current="page">Home</Link>
            </li>
            <li>
              <Link href="/#projects" onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }} className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Projects</Link>
            </li>
            <li>
              <Link href="/#education" onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }} className="scroll-auto block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Education</Link>
            </li>
            <li>
              <Link href="/#skills" onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }} className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Skills</Link>
            </li>
            <li>
              <Link href="/admin" onClick={() => { setMobileMenuOpen(!mobileMenuOpen) }} className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Admin</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
