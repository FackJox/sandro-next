'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function AboutFirst() {
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
      <div className='flex justify-center md:justify-start h-1/4 sm:h-1/3 w-screen mb-8 mt-32 md:ml-32 lg:ml-64'>
        <Image
          alt='sandro portrait'
          src='/img/about/portrait.jpg'
          width={200}
          height={300}
          className='rounded-[536px] object-cover '

          />
      </div>
       
        <div className='text-3xl font-bold sm:text-4xl md:text-5xl text-syellow px-4 sm:px-8 md:px-16 text-center mb-4 sm:mb-8'>
          HIGH ALTITUDES
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
          <p className=' font-Poppins text-lg sm:text-xl md:text-2xl text-icewhite px-4 sm:px-8 md:px-16 text-center'>
            My name is Sandro, I&apos;m a freelance film maker, photographer and part time ski bum.
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
          <p className='font-Poppins text-lg sm:text-xl md:text-2xl text-icewhite px-4 sm:px-8 md:px-16 text-center'>
            I love people, cameras and mountains and have spent the last decade bringing those passions together.
          </p>
        </div>
        
        <div className='mb-8 sm:mb-16'>
          <svg
            width={4}
            height={49}
            viewBox='0 0 4 49'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='flex md:pt-[-64px] '
            preserveAspectRatio='none'
          >
            <line x1={2} y1='48.0052' x2={2} y2='0.00524902' stroke='#FCC600' strokeWidth={4} strokeDasharray='6 6' />
          </svg>
        </div>
      </motion.div>
  )
}
