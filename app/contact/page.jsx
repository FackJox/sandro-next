'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
const Contact = dynamic(() => import('@/components/dom/Contact').then((mod) => mod.Contact), {
  ssr: true,
})
import { useEffect } from 'react'

export default function Page({props}) {
  
  
  console.log("🚀 ~ file: page.jsx:10 ~ Page ~ props:", props)
 
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5 }}
        className='z-40 flex w-screen h-screen overflow-hidden bg-transparent text-icewhite'
      >
        <Contact />
      </motion.div>
    </AnimatePresence>
  )
}
