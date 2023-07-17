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
        <div className=' font-BrandonReg font-normal leading-[normal] text-icewhite'>
          <p className='absolute right-24 bottom-4 lg:bottom-6 h-8 w-[122px] lg:text-base tracking-[3.68px]'>SCROLL</p>
        </div>

        <div className=''>
          <div className='absolute right-0 bottom-9 lg:bottom-12 h-[0] w-[132px] origin-top-left outline outline-1 outline-[rgba(255,255,255,1)] [rotate:0]' />
        </div>

        <div className=' font-BrandonReg font-normal leading-[normal] text-icewhite'>
          <p className='absolute left-24 bottom-4 lg:bottom-6 h-8 w-[122px] lg:text-base tracking-[3.68px]'>BACK</p>
        </div>

        <div className=''>
          <div className='absolute left-0 bottom-9 lg:bottom-12 h-[0] w-[132px] origin-top-left outline outline-1 outline-[rgba(255,255,255,1)] [rotate:0]' />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
