'use client'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import useNavigation from '@/helpers/hooks/useNavigation'
import { useStore } from '@/helpers/store'

export default function Page() {
  const { setPageInView } = useStore()
  const ref = useRef()
  usePlayAnimations(1)
  useNavigation(ref, '/portfolio')

  useEffect(() => {
    setPageInView('home')
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.5, duration: 2 } }}
        exit={{ opacity: 0, transition: { duration: 2.5 } }}
        className='z-40 flex items-center justify-center pb-10 w-screen h-screen bg-transparent text-icewhite'
      >
        <div className='grid grid-cols-3 grid-rows-2 gap-2 w-full'>
          <Link href='/portfolio/motion'>
            <div className='col-start-3 row-start-2 h-32 w-full flex justify-center items-center'>
              <motion.p layoutId='motion' className='w-[200px] h-12 text-4xl lg:text-5xl text-center text-icewhite'>
                MOTION
              </motion.p>
            </div>
          </Link>
          <Link href='/about'>
            <div className='col-start-2 row-start-2 h-32 w-full flex justify-center items-center'>
              <p className='w-[200px] h-16  text-5xl lg:text-6xl text-center text-gold'>ABOUT</p>
            </div>
          </Link>
          <Link href='/portfolio/stills'>
            <div className='col-start-1 row-start-2 h-32 w-full flex justify-center items-center'>
              <motion.p layoutId='stills' className='w-[200px] h-12 text-4xl lg:text-5xl text-center text-icewhite'>
                STILLS
              </motion.p>
            </div>
          </Link>
        </div>
        <div className='absolute justify-center items-center bottom-6 lg:bottom-20 h-7 w-screen lg:text-2xl tracking-[3.68px]'>
          <p>Swipe or Scroll to Navigate</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
