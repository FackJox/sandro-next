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

    useEffect(() => {

      console.log("🚀 ~ file: Navigator.jsx:20 ~ fwdRoute ~ pageInView:", pageInView)
    }, [pageInView])

    function fwdRoute(pageInView){

      switch (pageInView) {
        case 'home':
          return '/portfolio'
        case 'portfolio':
          return '/about/1'
        case 'aboutfirst':
          return '/about/2'
        case 'aboutsecond':
          return '/contact'
        case 'contact':
          return '/portfolio'
        default:
          return ''
      }
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
        {pageInView !== 'home' ? (
          <div>
            <div onClick={() => router.back()} className='cursor-pointer'>
              <div className='inline-flex font-BrandonReg font-normal leading-[normal] text-icewhite'>
                <p className='absolute md:left-36 left-20 bottom-12 md:bottom-16 h-7 w-[122px] text-xl md:text-2xl tracking-wide md:tracking-[3.68px]'>
                  BACK
                </p>
              </div>
            </div>
            <motion.div className='inline-flex' layoutId='leftline'>
              <div className='absolute left-0 bottom-16 md:bottom-20 h-[0] w-[66px] md:w-[132px] origin-top-left outline outline-1 outline-[rgba(255,255,255,1)] [rotate:0]' />
            </motion.div>
            <Link href={fwdRoute(pageInView)} className=''>
              <div className='inline-flex font-BrandonReg font-normal leading-[normal] text-icewhite'>
                <p className='absolute md:right-20 right-1 bottom-12 md:bottom-16 h-7 w-[122px] text-xl md:text-2xl tracking-wide md:tracking-[3.68px]'>
                  FWD
                </p>
              </div>  
            </Link>
            <motion.div className='inline-flex' layoutId='rightline'>
              <div className='absolute right-0 bottom-16 md:bottom-20 h-[0] w-[66px] md:w-[132px] origin-top-left outline outline-1 outline-[rgba(255,255,255,1)] [rotate:0]' />
            </motion.div>
          </div>
        ) : null}
      </motion.div>
    </AnimatePresence>
  )
}
