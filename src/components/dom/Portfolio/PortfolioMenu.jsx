'use client'
import React, { useState, useRef } from 'react'
import Link from 'next/link'
import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import useNavigation from '@/helpers/hooks/useNavigation'

export default function PortfolioMenu() {
  const ref = useRef()
  const [isHovering, setIsHovering] = useState({ motion: false, stills: false })
  
  const handleMouseOver = (element) => {
    setIsHovering({ ...isHovering, [element]: true })
  }
  
  const handleMouseOut = (element) => {
    setIsHovering({ ...isHovering, [element]: false })
  }

  usePlayAnimations(2)
  useNavigation(ref, '/about')

  return (
    <div ref={ref} className='flex flex-col w-screen h-screen font-BrandonReg '>
      <div className='grid h-full grid-cols-1 align-middle md:grid-cols-2'>
        <Link href='/portfolio/motion' className='flex items-center justify-center align-middle'>
          <div
            className={` flex items-center justify-center align-middle ${
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
            className={` flex items-center justify-center align-middle ${
              isHovering.stills ? 'hover-class-right' : ' text-icewhite'
            }`}
          >
            <p
              className={`text-icewhite flex h-28 w-[360px] items-center justify-center text-center text-7xl lg:w-[420px] ${
                isHovering.stills ? 'box' : ''
              }`}
              onMouseOver={() => handleMouseOver('stills')}
              onMouseOut={() => handleMouseOut('stills')}
            >
              STILLS
            </p>
          </div>
        </Link>
        <div className=' font-BrandonReg font-normal leading-[normal] text-lwhite'>
          <p className='absolute right-24 bottom-4 lg:bottom-6 h-8 w-[122px] lg:text-base tracking-[3.68px]'>SCROLL</p>
        </div>
        <div className=''>
          <div className='absolute right-0 bottom-9 lg:bottom-12 h-[0] w-[132px] origin-top-left outline outline-1 outline-[rgba(255,255,255,1)] [rotate:0]' />
        </div>
      </div>
    </div>
  )
}
