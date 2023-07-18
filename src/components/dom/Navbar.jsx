'use client'
import Link from "next/link"
import Menu  from "@/components/dom/Menu"
import { useState } from 'react'


export function Navbar() {
const [isVisible, setIsVisible] = useState(false)

  return (
    <>
      <nav className='fixed z-50 flex items-center justify-between w-full no-underline bg-transparent select-none'>
        <div className='flex items-center justify-between '>
          <Link href='/' className=''>
            <p className='h-12 w-[200px] text-center text-3xl font-bold text-gold'>sandro gh</p>
          </Link>
        </div>

        <div id='menu-button' className='h-12 m-6 text-center items-center justify-between font-bold text-gold'>
          <svg
            width={46}
            height={37}
            viewBox='0 0 46 37'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='relative h-[32px] w-[40px] cursor-pointer'
            preserveAspectRatio='none'
            onClick={() => setIsVisible(!isVisible)}
          >
            <path
              d='M16.2495 5.75507L22.9195 14.5102L31.257 9.03882L39.5926 25.4499H6.24832L16.2495 5.75507Z'
              stroke='#F3982A'
              strokeWidth={4}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M10.1718 19.6902C14.5398 18.0375 18.9079 18.1839 23.2741 20.1342C27.8434 22.1784 32.4281 22.2416 36.9955 20.3346'
              stroke='#F3982A'
              strokeWidth={4}
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path d='M6.28085 31.2825L39.5256 31.2199Z' fill='#D8D8D8' />
            <path d='M6.28085 31.2825L39.5256 31.2199' stroke='#F3982A' strokeWidth={4} strokeLinecap='round' />
          </svg>
        </div>
      </nav>
      {isVisible && <Menu />} 
    </>
  )
}
