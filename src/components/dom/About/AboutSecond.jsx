'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function AboutSecond() {
  const gridVariants = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -100, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
    className='flex flex-col items-center justify-end h-full w-screen '
    initial='initial'
      animate='animate'
      exit='exit'
      variants={gridVariants}
    >
      <div className='flex justify-start h-1/4 sm:h-1/3 w-screen mb-8 sm:mb-8 md:mb-16 lg:mb-32 ml-8 sm:ml-16 md:ml-32 lg:ml-64'>
          <Image
            alt='sandro flying a drone'
            src='/img/about/drone.jpg'
            width={300}
            height={300}
            className='rounded-[536px] object-cover '
          />
      </div>

      <div className='text-3xl font-bold sm:text-4xl md:text-5xl text-syellow px-4 sm:px-8 md:px-16 text-center mb-4 sm:mb-8'>
        HOSTILE ENVIRONMENTS
      </div>
      <div className='flex items-center justify-center mb-4 sm:mb-8'>
        <svg
          width={4}
          height={49}
          viewBox='0 0 4 49'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='flex'
          preserveAspectRatio='none'
        >
          <line x1={2} y1='48.0052' x2={2} y2='0.00524902' stroke='#FCC600' strokeWidth={4} strokeDasharray='6 6' />
        </svg>
      </div>
      <div className='flex items-center mb-4 sm:mb-8'>
        <p className='text-left font-Poppins text-lg sm:text-xl md:text-2xl text-icewhite px-4 sm:px-8 md:px-16 text-center'>
          In between I worked on Netflix&apos;s &apos;14 Peaks&apos; as a high altitude DP and produced climbing
          content for Red Bull TV, Epic TV, Montane, Berghaus and Osprey.
        </p>
      </div>
      <div className='flex items-center justify-center mb-4 sm:mb-8'>
        <svg
          width={4}
          height={49}
          viewBox='0 0 4 49'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='flex'
          preserveAspectRatio='none'
        >
          <line x1={2} y1='48.0052' x2={2} y2='0.00524902' stroke='#FCC600' strokeWidth={4} strokeDasharray='6 6' />
        </svg>
      </div>
      <div className='flex items-center mb-4 sm:mb-8'>
        <p className='text-left font-Poppins text-lg sm:text-xl md:text-2xl text-icewhite px-4 sm:px-8 md:px-16 text-center'>
          In 2018 I filmed the first Afghan woman as she summited Noshaq, the countries highest peak. In 2022 I flew a
          drone over K2 as the first Pakistani woman reached the top.
        </p>
      </div>
      <div className='mb-8 sm:mb-16'>
        <svg
          width={4}
          height={49}
          viewBox='0 0 4 49'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='flex md:pt-[-32px] sm:md:pt-[-64px]'
          preserveAspectRatio='none'
        >
          <line x1={2} y1='48.0052' x2={2} y2='0.00524902' stroke='#FCC600' strokeWidth={4} strokeDasharray='6 6' />
        </svg>
      </div>
    </motion.div>
  )
}
