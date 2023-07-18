'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import useNavigation from '@/helpers/hooks/useNavigation'

import { useStore } from '@/helpers/store'

import { AboutSecond } from '@/components/dom/About/AboutSecond'

export default function Page() {
  const { setPageInView } = useStore()

  useEffect(() => {
    setPageInView('aboutsecond')
  }, [])
  const ref = useRef(null)
  const isAnimationPlayingRef = useRef(useStore.getState().isAnimationPlaying)

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        isAnimationPlayingRef.current = newState.isAnimationPlaying
      },
      (state) => {
        state.isAnimationPlaying !== isAnimationPlayingRef.current
      },
    )
    return () => {
      unsubscribe()
    }
  }, [])

  useNavigation(ref, 'contact')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 1, duration: 2 } }}
      exit={{ opacity: 0, transition: { duration: 2.5 } }}
      className='z-40 flex items-center justify-center  w-screen h-screen overflow-hidden bg-transparent text-icewhite'
    >
      <AboutSecond key='aboutsecond' />
    </motion.div>
  )
}
