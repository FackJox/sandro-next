'use client'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import useNavigation from '@/helpers/hooks/useNavigation'

export default function Menu() {
  const ref = useRef()
  usePlayAnimations(1)
  useNavigation(ref, '/portfolio')

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0, duration: 2 } }}
        exit={{ opacity: 0, transition: { duration: 2.5 } }}
        className='ml-auto flex z-40 absolute top-16 right-8 justify-end bg-gray-800 text-icewhite menu'
        
      >
        <div className='w-24 h-24' ></div>
        <div>
          <Link href='/portfolio/stills'>
            <p className='w-24 h-8 text-base text-right text-white'>STILLS</p>
          </Link>
          <Link href='/about'>
            <p className='w-24 h-8 text-2xl text-right text-[#f3982a]'>ABOUT</p>
          </Link>
          <Link href='/portfolio/motion'>
            <p className='w-24  h-8 text-base text-right  text-white'>MOTION</p>
          </Link>
          <Link href='/contact'>
            <p className='w-24 h-8 text-2xl text-right text-[#f3982a]'>CONTACT</p>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
