'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useEffect, useRef } from 'react'


import { AboutFirst } from '@/components/dom/About/AboutFirst'
import { AboutSecond } from '@/components/dom/About/AboutSecond'

import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import useNavigation from '@/helpers/hooks/useNavigation'

export default function Page() {
  const ref = useRef()
  usePlayAnimations(3)
  useNavigation(ref, '/contact')

  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  return (
    <div ref={ref} onClick={handleClick} className='z-40 flex w-screen h-screen overflow-hidden bg-transparent text-icewhite'>
      <AnimatePresence mode='wait'>
        {!isClicked && <AboutFirst key='aboutfirst' isClicked={isClicked} handleClick={handleClick} />}
        {isClicked && <AboutSecond key='aboutsecond' isClicked={isClicked} handleClick={handleClick} />}
      </AnimatePresence>
    </div>
  )
}
