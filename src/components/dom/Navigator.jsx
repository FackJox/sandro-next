'use client'
import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import useNavigation from '@/helpers/hooks/useNavigation'
import { useRouter } from 'next/navigation'
import { useStore } from '@/helpers/store'


export default function Navigator() {
  const { pageInView } = useStore()
  const ref = useRef()
  usePlayAnimations(1)
  useNavigation(ref, '/portfolio')
    const router = useRouter()
    console.log('pageInView', pageInView)

   const pageData = {home: '',
                      portfolio: '/about',
                      about: '/contact',
                      contact: '/portfolio'

    }



  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0, duration: 2 } }}
        exit={{ opacity: 0, transition: { duration: 2.5 } }}
        className='z-40 w-screen h-screen justify-end bg-transparent text-icewhite'
      >
        <div>
          <div onClick={() => router.back()} className='cursor-pointer'>
            <div className='inline-flex font-BrandonReg font-normal leading-[normal] text-icewhite'>
              <p className='absolute left-36 bottom-9 lg:bottom-20 h-7 w-[122px] lg:text-2xl tracking-[3.68px]'>BACK</p>
            </div>
          </div>
          <div className='inline-flex'>
            <div className='absolute left-0 bottom-9 lg:bottom-24 h-[0] w-[132px] origin-top-left outline outline-1 outline-[rgba(255,255,255,1)] [rotate:0]' />
          </div>
          <Link href='/portfolio' className=''>
            <div className='inline-flex font-BrandonReg font-normal leading-[normal] text-icewhite'>
              <p className='absolute right-32 bottom-6 lg:bottom-20 h-7 w-[122px] lg:text-2xl tracking-[3.68px]'>
                SCROLL
              </p>
            </div>
          </Link>
          <div className='inline-flex'>
            <div className='absolute right-0 bottom-9 lg:bottom-24 h-[0] w-[132px] origin-top-left outline outline-1 outline-[rgba(255,255,255,1)] [rotate:0]' />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
