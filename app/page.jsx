'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Page() {
  const router = useRouter()


  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.5, duration: 2 } }}
        exit={{ opacity: 0, transition: { duration: 2.5 } }}
        className='flex w-screen h-screen overflow-hidden text-icewhite bg-transparent z-40'
      >
        <div className='grid grid-cols-3 grid-rows-2 gap-2'>
          <div className='col-span-3'>TEST</div>
          <div className='row-start-2'>
            {' '}
            <p className='w-[200px] h-16 text-4xl text-center text-white'>STILLS</p>
          </div>
          <div className='row-start-2'>
            {' '}
            <p className='w-[200px] h-16  text-[40px] text-center text-gold'>ABOUT</p>
          </div>
          <div className='row-start-2'>
            {' '}
            <p className='w-[200px] h-12 text-4xl text-center text-white'>MOTION</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
