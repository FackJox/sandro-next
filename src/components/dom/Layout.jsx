'use client'
import { useRef, useEffect, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash'

import { useStore } from '@/helpers/store'
import { handleAnimations } from '@/components/canvas/Mountains/Mountains'  

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const pathnames = ['/', 'portfolio', '/about', '/contact']


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
        (state) => {
          state.isAnimationPlaying !== isAnimationPlayingRef.current
        },
      )
      return () => {
        unsubscribe()
      }
    }, [])

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        routeTriggersRef.current = newState.domTriggers.routeTriggers
      },
      (state) => state.domTriggers.routeTriggers !== routeTriggersRef.current,
    )
    return () => unsubscribe()
  }, [])

const handleWheel = useCallback(
    debounce(
      () => {
        console.log("WHEELYY")
        incrementMasterTrigger();
        if (!isAnimationPlayingRef.current && routeTriggersRef.current !== undefined) {
          router.push(pathnames[routeTriggersRef.current % pathnames.length])
        }
      },
      1000,
      { leading: true, trailing: false },
    ),
    [routeTriggersRef.current],
  );

    useEffect(() => {
      let refvar = ref.current
      ref.current.addEventListener('wheel', handleWheel)
      return () => refvar.removeEventListener('wheel', handleWheel)
    }, [handleWheel])


    


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
