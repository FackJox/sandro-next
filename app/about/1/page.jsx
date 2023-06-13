'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useStore } from '@/helpers/store'

// const AboutFirst = dynamic(() => import('@/components/dom/About/AboutFirst'), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// })
// const AboutSecond = dynamic(() => import('@/components/dom/About/AboutSecond'), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// })


import { AboutFirst } from '@/components/dom/About/AboutFirst'

export default function Page({isClicked, handleClick}) {
  const ref = useRef(null)
  const router = useRouter()

  const isAnimationPlayingRef = useRef(useStore.getState().isAnimationPlaying)

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        isAnimationPlayingRef.current = newState.isAnimationPlaying
      },
      (state) => state.isAnimationPlaying !== isAnimationPlayingRef.current,
    )
    return () => unsubscribe()
  }, [])

  const handleWheel = useCallback(() => {
    if (!isAnimationPlayingRef.current) {
      router.push('/about/2')
    }
  }, [router, isAnimationPlayingRef])

  useEffect(() => {
    let refVar = ref.current
    ref.current.addEventListener('wheel', handleWheel)
    return () => refVar.removeEventListener('wheel', handleWheel)
  }, [handleWheel])
  
  

  return (
    <div  onClick={handleClick} className='z-40 flex w-screen h-screen overflow-hidden bg-transparent text-icewhite'>
      <AnimatePresence mode='wait'>
        {!isClicked && <AboutFirst key='aboutfirst' isClicked={isClicked} handleClick={handleClick} />}
      </AnimatePresence>
    </div>
  )
}
