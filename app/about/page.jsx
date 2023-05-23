'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const AboutFirst = dynamic(() => import('@/components/dom/About/AboutFirst').then((mod) => mod.AboutFirst), {
  ssr: true,
})
const AboutSecond = dynamic(() => import('@/components/dom/About/AboutSecond').then((mod) => mod.AboutSecond), {
  ssr: true,
})


export default function Page() {


  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
      setIsClicked(!isClicked)

  }

  return (
    <div  onClick={handleClick} className='flex w-screen h-screen overflow-hidden text-icewhite bg-transparent z-40'>
      <AnimatePresence mode='wait'>
        {!isClicked && <AboutFirst key='aboutfirst' isClicked={isClicked} handleClick={handleClick} />}
        {isClicked && <AboutSecond key='aboutsecond' isClicked={isClicked} handleClick={handleClick} />}
      </AnimatePresence>
    </div>
  )
}
