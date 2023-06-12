'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'


// const AboutFirst = dynamic(() => import('@/components/dom/About/AboutFirst'), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// })
// const AboutSecond = dynamic(() => import('@/components/dom/About/AboutSecond'), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// })


import { AboutSecond } from '@/components/dom/About/AboutSecond'

export default function Page({isClicked, handleClick}) {
  
  


  return (
    <div  onClick={handleClick} className='z-40 flex w-screen h-screen overflow-hidden bg-transparent text-icewhite'>
      <AnimatePresence mode='wait'>
        {isClicked && <AboutSecond key='aboutsecond' isClicked={isClicked} handleClick={handleClick} />}
      </AnimatePresence>
    </div>
  )
}
