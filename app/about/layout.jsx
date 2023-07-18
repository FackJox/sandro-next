'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useStore } from '@/helpers/store'
import { AboutFirst } from '@/components/dom/About/AboutFirst'
import { AboutSecond } from '@/components/dom/About/AboutSecond'

import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import useNavigation from '@/helpers/hooks/useNavigation'

export default function Page() {
  const ref = useRef()
  const { setSunCycle } = useStore()

  usePlayAnimations(3)
  useNavigation(ref, '/contact')

  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    screen
    setIsClicked(!isClicked)
  }
  useEffect(() => {
    setSunCycle(true);
  }, []);


  return (
     <AnimatePresence>
        <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 3.8, duration: 2 } }}
      exit={{ opacity: 0, transition: { duration: 2.5 } }}
      >
    <div ref={ref} onClick={handleClick} className='flex flex-col h-screen justify-end items-center overflow-hidden bg-transparent text-icewhite'>
      <div className='h-1/2'>
        <AnimatePresence mode='wait'>
          {!isClicked && <div>
            <AboutFirst key='aboutfirst' isClicked={isClicked} handleClick={handleClick} />
          </div>}

          {isClicked && <div>
            <AboutSecond key='aboutsecond' isClicked={isClicked} handleClick={handleClick} />
          </div>}
        </AnimatePresence>
      </div>
    </div>
     
    </motion.div>
  </AnimatePresence >
  
  )
}
