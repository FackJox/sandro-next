'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

import { AboutFirst } from '@/components/dom/About/AboutFirst'
import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import useNavigation from '@/helpers/hooks/useNavigation'
import { useStore } from '@/helpers/store'

export default function Page() {
  const { setPageInView } = useStore()
  useEffect(() => {
    setPageInView('aboutfirst')
  }, [])

  const ref = useRef(null)
  const router = useRouter()
  usePlayAnimations(3)
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

  useNavigation(ref, '/about/2')

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 3.8, duration: 2 } }}
      exit={{ opacity: 0, transition: { duration: 2.5 } }}
      className='z-40 flex items-center justify-center w-screen h-screen overflow-hidden bg-transparent text-icewhite'
    >
      <AboutFirst key='aboutfirst' />
    </motion.div>
  )
}
