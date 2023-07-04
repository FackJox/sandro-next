'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import { useStore } from '@/helpers/store'


import { AboutSecond } from '@/components/dom/About/AboutSecond'

export default function Page({ isClicked, handleClick }) {
  const ref = useRef(null)
  const router = useRouter()
  usePlayAnimations(2)
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

  const handleWheel = useCallback(() => {
    if (!isAnimationPlayingRef.current) {
      router.push('/contact')
    }
  }, [router, isAnimationPlayingRef.current])

  useEffect(() => {
    let refVar = ref.current
    ref.current.addEventListener('wheel', handleWheel)
    return () => refVar.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  return (
    <div onClick={handleClick} className='z-40 flex w-screen h-screen overflow-hidden bg-transparent text-icewhite'>
      <AnimatePresence mode='wait'>
        {isClicked && <AboutSecond key='aboutsecond' isClicked={isClicked} handleClick={handleClick} />}
      </AnimatePresence>
    </div>
  )
}
