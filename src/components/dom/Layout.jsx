'use client'
import { useRef, useEffect, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash'

import { useStore } from '@/helpers/store'
import { handleAnimations } from '@/components/canvas/Mountains/Mountains'  

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const pathnames = ['/', '/portfolio', '/about', '/contact']


const Layout = ({ children }) => {
  const router = useRouter()
  const ref = useRef(null)

  const incrementMasterTrigger = useStore((state) => state.incrementMasterTrigger)
  const routeTriggersRef = useRef(useStore.getState().domTriggers.routeTriggers)
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

 useEffect(() => {
   const unsubscribe = useStore.subscribe(
     (newState) => {
       routeTriggersRef.current = newState.domTriggers.routeTriggers

       if (!isAnimationPlayingRef.current && routeTriggersRef.current !== undefined) {
         router.push(pathnames[(routeTriggersRef.current - 1) % pathnames.length])
         console.log('pathanems', pathnames[(routeTriggersRef.current - 1) % pathnames.length])
         console.log('🚀 ~ file: Layout.jsx:42 ~ useEffect ~ routeTriggersRef.current:', routeTriggersRef.current)
       }
     },
     (state) => state.domTriggers.routeTriggers !== routeTriggersRef.current,
   )
   return () => unsubscribe()
 }, [])

const handleWheel = useCallback(
  debounce(
    () => {
      console.log('WHEELYY', routeTriggersRef.current)
      incrementMasterTrigger()

    },
    500,
    { leading: true, trailing: false },
  ),
  [routeTriggersRef.current, isAnimationPlayingRef.current],
)

    useEffect(() => {
      let refVar = ref.current
      ref.current.addEventListener('wheel', handleWheel)
      return () => refVar.removeEventListener('wheel', handleWheel)
    }, [handleWheel])

useEffect(() => {
  console.log('🚀 ~ file: Layout.jsx:54 ~ Layout ~ isAnimationPlayingRef.current:', isAnimationPlayingRef.current)
}, [isAnimationPlayingRef.current])
    


  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        touchAction: 'auto',
      }}
    >
      {children}
      <Scene
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -10,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
        eventSource={ref}
        eventPrefix='client'
      />
    </div>
  )
}

export { Layout }
