'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import useNavigation from '@/helpers/hooks/useNavigation'
import { usePathname } from 'next/navigation';
import { useStore } from '@/helpers/store'

export default function PortfolioMenu() {

   const { setPageInView } = useStore()

     useEffect(() => {

       setPageInView('portfolio')
     }, [])

  const ref = useRef()
  const [isHovering, setIsHovering] = useState({ motion: false, stills: false })

  const { setSunCycle } = useStore()

  const handleMouseOver = (element) => {
    setIsHovering({ ...isHovering, [element]: true })
  }

  const handleMouseOut = (element) => {
    setIsHovering({ ...isHovering, [element]: false })
  }

  
  usePlayAnimations(2)
  useEffect(() => {
    setSunCycle(false);
  }, []);




  useNavigation(ref, '/about')

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 2.5, duration: 2 } }}
        exit={{ opacity: 0, transition: { duration: 2.5 } }}
      >
        <div ref={ref} className='flex flex-col w-screen h-screen font-BrandonReg '>
          <div className='grid h-full grid-cols-1 align-middle md:grid-cols-2'>
            <Link href='/portfolio/motion' className='flex items-center justify-center align-middle'>
              <div
                className={` h-screen w-full flex items-center justify-center align-middle ${
                  isHovering.motion ? 'hover-class-left' : ' text-icewhite'
                }`}
              >
                <p
                  className={`flex h-28 w-[360px] items-center justify-center text-center align-middle text-7xl lg:w-[420px]  ${
                    isHovering.motion ? 'box' : ''
                  } `}
                  onMouseOver={() => handleMouseOver('motion')}
                  onMouseOut={() => handleMouseOut('motion')}
                >
                  MOTION
                </p>
              </div>
            </Link>
            <Link href='/portfolio/stills' className='flex items-center justify-center align-middle'>
              <div
                className={` h-screen w-full flex items-center justify-center align-middle ${
                  isHovering.stills ? 'hover-class-right' : ' text-icewhite'
                }`}
              >
                <p
                  className={`flex h-28 w-[360px] items-center justify-center text-center align-middle text-7xl lg:w-[420px] ${
                    isHovering.stills ? 'box' : ''
                  }`}
                  onMouseOver={() => handleMouseOver('stills')}
                  onMouseOut={() => handleMouseOut('stills')}
                >
                  STILLS
                </p>
              </div>
            </Link>
           
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
