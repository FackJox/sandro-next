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
        className='z-40 flex flex-col items-center w-screen h-screen bg-transparent text-icewhite'
        id='1'
      >
        <div id='2' className='flex h-3/4 w-full'></div>
        <div id='3' className='grid grid-cols-3 grid-rows-2 gap-2 w-screen h-1/4 '>
          <Link href='/portfolio/motion'>
            <div className='col-start-3 row-start-2 h-32 w-full flex justify-center items-center '>
              <motion.div className='flex' layoutId='rightline'>
                <div className='absolute z-50 left-0  h-0 w-8 md:w-[132px] outline outline-1 outline-[rgba(255,255,255,1)] [rotate:0]' />
              </motion.div>

              <motion.p
                layoutId='motion'
                className='w-full md:h-12 text-2xl md:text-5xl text-center text-icewhite'
              >
                MOTION
              </motion.p>
            </div>
          </Link>

          <Link href='/about'>
            <div className='col-start-2 invisible lg:visible row-start-2 h-36 w-full flex justify-center items-center'>
              <p className=' h-16 text-3xl md:text-7xl text-center text-gold justify-self-center'>ABOUT</p>
            </div>
          </Link>

          <Link href='/portfolio/stills'>
            <div className='col-start-1 row-start-2 h-32 w-full flex justify-center items-center'>
              <motion.div className='flex' layoutId='leftline'>
                <div className='absolute z-50 right-0 h-0 w-8 md:w-[132px] outline outline-1 outline-[rgba(255,255,255,1)] [rotate:0]' />
              </motion.div>

              <motion.p layoutId='stills' className='w-full md:h-12 text-2xl md:text-5xl text-center text-icewhite'>
                STILLS
              </motion.p>
            </div>
          </Link>
        </div>

        {/* <div id='4' className='flex items-center justify-center h-screen absolute w-screen text-xl tracking-[3.68px]'>
          <p>click and swipe or scroll to navigate</p>
        </div> */}
      </motion.div>
    </AnimatePresence>
  )
}
