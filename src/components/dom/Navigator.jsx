'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion'
import Link from 'next/link'
import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import useNavigation from '@/helpers/hooks/useNavigation'
import { useRouter } from 'next/navigation'

const textVariant = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hidden: { opacity: 0, y: -50 },
}

const AnimatedText = ({ text }) => {
  const control = useAnimation()
  const [textRef, inView] = useInView() || [null, undefined]

  useEffect(() => {
    if (inView) {
      control.start('visible')
    } else {
      control.start('hidden')
    }
  }, [control, inView])

  return (
    <motion.p
      ref={textRef}
      variants={textVariant}
      initial='hidden'
      animate={control}
      className='absolute right-32 bottom-6 lg:bottom-20 h-7 w-[122px] lg:text-2xl tracking-[3.68px]'
    >
      {text}
    </motion.p>
  )
}
export default function Navigator() {
  const navRef = useRef()
  usePlayAnimations(1)
  const router = useRouter()

  I
  const [text, setText] = useState('SCROLL')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText((prevText) => (prevText === 'SCROLL' ? 'CLICK' : 'SCROLL'))
    }, 2000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        ref={navRef}
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
              <AnimatedText text={text} />
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
