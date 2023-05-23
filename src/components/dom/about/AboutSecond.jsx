import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import Image from 'next/image'
export const AboutSecond = ({ isClicked, handleClick }) => {
  const gridVariants = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -100, transition: { duration: 0.5 } },
  }

  const control = useAnimation()

  useEffect(() => {
    if (isClicked) {
      control.start('animate')
    } else {
      control.start('initial')
    }
  }, [control, isClicked])

  return (
    <div
      onClick={handleClick}
      className='h-full flex-col items-center justify-center text-left align-middle font-Poppins text-2xl text-icewhite'
    >
      <div className='flex h-1/6'>test</div>
      <motion.div
        className='grid-rows-8 grid h-full grid-cols-3 pb-32 align-middle'
        initial='initial'
        animate={control}
        exit='exit'
        variants={gridVariants}
      >
        <div className='col-span-3 flex items-center justify-center'>HIGH ALTITUDES TUNNEL RAT</div>
        <div className='col-span-2 col-start-2 row-start-5 flex items-center pl-40'>
          <p className='h-[108px] w-[530px] text-left font-Poppins text-xl text-icewhite'>
            In between I worked on Netflix&apos;s &apos;14 Peaks&apos; as a high altitude DP and produced climbing
            content for Red Bull TV, Epic TV, Montane, Berghaus and Osprey.
          </p>
        </div>
        <div className='col-start-2 row-start-2 flex items-center justify-center'>
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
        <div className='col-span-2 col-start-1 row-start-3 flex items-end justify-end pr-40 '>
          <p className='flex h-[108px] w-[530px] items-end justify-end text-left font-Poppins text-xl text-icewhite'>
            In 2018 I filmed the first Afghan woman as she summited Noshaq, the countries highest peak. In 2022 I flew a
            drone over K2 as the first Pakistani woman reached the top.
          </p>{' '}
        </div>
        <div className='col-start-2 row-start-4 flex items-center justify-center'>
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
        <div className='col-start-2 row-start-6 flex items-center justify-center'>
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
            alt="sandro flying a drone"
            src='/img/about/drone.jpg'
            width={200}
            height={246}
            className='rounded-[536px] object-cover'
          />
        </div>
      </motion.div>
    </div>
  )
}
