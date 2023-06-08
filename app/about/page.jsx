'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'


const AboutFirst = dynamic(() => import('@/components/dom/About/AboutFirst'), {
  ssr: true,
  loading: () => <p>Loading...</p>,
})
const AboutSecond = dynamic(() => import('@/components/dom/About/AboutSecond'), {
  ssr: true,
  loading: () => <p>Loading...</p>,
})





export default function Page() {
  
  


  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
      setIsClicked(!isClicked)

  }

  return (
    <div  onClick={handleClick} className='z-40 flex w-screen h-screen overflow-hidden bg-transparent text-icewhite'>
      <AnimatePresence mode='wait'>
        {!isClicked && <AboutFirst key='aboutfirst' isClicked={isClicked} handleClick={handleClick} />}
        {isClicked && <AboutSecond key='aboutsecond' isClicked={isClicked} handleClick={handleClick} />}
      </AnimatePresence>
    </div>
  )
}
