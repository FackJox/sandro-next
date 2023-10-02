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
        className='ml-auto flex z-40 absolute top-16 right-5 justify-end bg-gray-800 text-icewhite menu '
      >
        <div className='flex-col mr-3 my-3git a'>
          <div className='flex'>
            <Link href='/about'>
              <p className='w-36 py-3  h-8 text-xl text-right text-gold'>ABOUT</p>
            </Link>
          </div>
          <div className='flex'>
              <Link href='/contact'>
                <p className='w-36 py-2 h-8 text-xl text-right text-icewhite'>CONTACT</p>
              </Link>
            </div>
          <div className='flex'>

            <Link href='/portfolio'>
              <p className='w-36 py-1 h-8 text-xl text-right  text-gold'>PORTFOLIO</p>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
