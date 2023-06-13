'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
const Contact = dynamic(() => import('@/components/dom/Contact').then((mod) => mod.Contact), {
  ssr: true,
})

import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import useNavigation from '@/helpers/hooks/useNavigation'

export default function Page() {
  const ref = useRef()
  usePlayAnimations(4)
  useNavigation(ref, '/')
  // console.log("🚀 ~ file: page.jsx:10 ~ Page ~ props:", props)

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
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
