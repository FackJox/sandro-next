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

import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()


  const [isClicked, setIsClicked] = useState(false)

   const handleClick = () => {
     if (isClicked) {
       router.push('/contact')
     } else {
       setIsClicked(!isClicked)
     }
   }


  return (
    <>
      <AnimatePresence mode='wait'>
        {!isClicked && <AboutFirst key='aboutfirst' isClicked={isClicked} handleClick={handleClick} />}
        {isClicked && <AboutSecond key='aboutsecond' isClicked={isClicked} handleClick={handleClick} />}
      </AnimatePresence>
    </>
  )
}
