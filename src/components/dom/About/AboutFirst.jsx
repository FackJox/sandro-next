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
    <div className='flex items-end h-screen w-screen'>
      <motion.div
        className='grid h-auto grid-cols-3 align-end grid-rows-8 pb-20 p-4'
        initial='initial'
        animate='animate'
        exit='exit'
        variants={gridVariants}
      >
        <div className='flex items-center justify-center col-span-3 row-start-2 col-start-1 text-2xl md:text-5xl text-syellow'>
          HIGH ALTITUDES
        </div>
        <div className='flex items-center col-span-2 col-start-2 row-start-5 md:pl-40'>
          <p className='h-[108px] w-[530px] text-left font-Poppins text-xl md:text-2xl text-icewhite'>
            I love people, cameras and mountains and have spent the last decade bringing those passions together.
          </p>
        </div>
        <div className='flex items-center justify-center col-start-2 row-start-3'>
          <svg
            width={4}
            height={49}
            viewBox='0 0 4 49'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className=''
            preserveAspectRatio='none'
          >
            <line x1={2} y1='48.0052' x2={2} y2='0.00524902' stroke='#FCC600' strokeWidth={4} strokeDasharray='6 6' />
          </svg>
        </div>
        <div className='flex items-end justify-end col-span-2 col-start-1 row-start-3 md:pr-40 '>
          <p className='flex h-[108px] w-[530px] items-end justify-end text-left font-Poppins text-xl md:text-2xl text-icewhite'>
            My name is Sandro, I&apos;m a freelance film maker, photographer and part time ski bum.
          </p>
        </div>
        <div className='flex items-center justify-center col-start-2 row-start-5'>
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
        <div className='flex items-center justify-center col-start-2 row-start-7'>
          <svg
            width={4}
            height={49}
            viewBox='0 0 4 49'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='flex  pt-[-64px] '
            preserveAspectRatio='none'
          >
            <line x1={2} y1='48.0052' x2={2} y2='0.00524902' stroke='#FCC600' strokeWidth={4} strokeDasharray='6 6' />
          </svg>
        </div>
        <div className='col-start-2 md:row-span-3 md:row-start-1 mt-[70px] ml-[-125px]'>
          <Image
            alt='sandro portrait'
            src='/img/about/portrait.jpg'
            width={200}
            height={246}
            className=' rounded-[536px] object-cover'
          />
        </div>
      </motion.div>
    </div>
  )
}
