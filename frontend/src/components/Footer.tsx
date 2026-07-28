import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='bg-cyan-500 dark:bg-zinc-900/60 text-white'>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 p-5">
        <div className='flex flex-col items-center'>
          <h1 className='text-lg'><b>MaskVision</b></h1>
          <p className='text-xs'>AI Powered Privacy Protection</p>
        </div>
        <div className='text-xs'>
          ©2026 Ardinox
        </div>
        <div className='flex flex-col items-center text-md'>
          <Link
            href="https://github.com/Ardinox"
            target="_blank"
            rel="noopener noreferrer"

            className="flex gap-1 transition-colors visited:text-blue-700 hover:text-blue-400 dark:hover:text-blue-300"
          >Github</Link>
          <Link href="https://www.linkedin.com/in/ajoyshow/"
            target="_blank"
            rel="noopener noreferrer"

            className="flex gap-1 transition-colors visited:text-blue-700 hover:text-blue-400 dark:hover:text-blue-300"
          >LinkedIn
          </Link>
        </div>
      </div>

    </footer>
  )
}

export default Footer