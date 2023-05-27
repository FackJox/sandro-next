'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
const Contact = dynamic(() => import('@/components/dom/Contact').then((mod) => mod.Contact), {
  ssr: true,
})

export default function Page() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5 }}
        className='flex w-screen h-screen overflow-hidden text-icewhite bg-transparent z-40'
      >
        <Contact />
      </motion.div>
    </AnimatePresence>
  )
}
