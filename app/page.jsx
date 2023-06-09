'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import useNavigation from '@/helpers/hooks/useNavigation'

export default function Page() {
  const ref = useRef()
  usePlayAnimations(1)
  useNavigation(ref, '/portfolio')



  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.5, duration: 2 } }}
        exit={{ opacity: 0, transition: { duration: 2.5 } }}
        className='z-40 flex items-center justify-center pb-10 w-screen h-screen bg-transparent text-icewhite'
      >
        <div className='grid grid-cols-3 grid-rows-2 gap-2'>
          <div className='col-span-3'></div>
          <Link href='/portfolio/stills' className=''>
            <div className='row-start-2 m-10'>
              <p className='w-[200px] h-16 text-4xl text-center text-icewhite'>STILLS</p>
            </div>
          </Link>
          <Link href='/about' className=''>
          <div>

            <div  className='row-start-2 m-10'>
              <p className='w-[200px] h-16  text-5xl text-center text-gold'>ABOUT</p>
            </div>
          </div>
          </Link>
          <Link href='/portfolio/motion' className=''>
            <div className='row-start-2 m-10'>
              <p className='w-[200px] h-12 text-4xl text-center text-icewhite'>MOTION</p>
            </div>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}