'use client'

import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AboutFirst } from '@/components/dom/About/AboutFirst'
import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import { useStore } from '@/helpers/store'

export default function Page({ isClicked, handleClick }) {
  const ref = useRef(null)
  const router = useRouter()
  usePlayAnimations(1)
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
      router.push('/about/2')
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
       <AboutFirst key='aboutfirst' />
      </AnimatePresence>
    </div>
  )
}
