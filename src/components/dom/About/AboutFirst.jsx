'use client'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'


export function AboutFirst({ isClicked, handleClick }) {
  const gridVariants = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -100, transition: { duration: 0.5 } },
  }

  const control = useAnimation()

  useEffect(() => {
    if (isClicked) {
      control.start('exit')
    } else {
      control.start('animate')
    }
  }, [control, isClicked])

  return (
    <div
      onClick={handleClick}
      className='flex-col items-center justify-center h-full text-2xl text-left align-middle font-Poppins text-icewhite'
    >
      <div className='flex h-1/6'></div>
      <motion.div
        className='grid h-full grid-cols-3 pb-32 align-middle grid-rows-8'
        initial='initial'
        animate={control}
        exit='exit'
        variants={gridVariants}
      >
        <div className='flex items-center justify-center col-span-3'>HIGH ALTITUDES TUNNEL RAT</div>
        <div className='flex items-center col-span-2 col-start-2 row-start-5 pl-40'>
          <p className='h-[108px] w-[530px] text-left font-Poppins text-2xl text-icewhite'>
            I love people, cameras and mountains and have spent the last decade bringing those passions together.
          </p>
        </div>
        <div className='flex items-center justify-center col-start-2 row-start-2'>
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
        <div className='flex items-end justify-end col-span-2 col-start-1 row-start-3 pr-40 '>
          <p className='flex h-[108px] w-[530px] items-end justify-end text-left font-Poppins text-2xl text-icewhite'>
            My name is Sandro, I&apos;m a freelance film maker, photographer and part time ski bum.
          </p>
        </div>
        <div className='flex items-center justify-center col-start-2 row-start-4'>
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
        <div className='flex items-center justify-center col-start-2 row-start-6'>
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
        <div className='col-start-1 row-span-3 row-start-4 pl-24'>
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


