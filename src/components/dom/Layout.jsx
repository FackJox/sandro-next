'use client'
import { useRef, useEffect, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash'

import { useStore } from '@/helpers/store'
import { handleAnimations } from '@/components/canvas/Mountains/Mountains'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const pathnames = ['/', '/portfolio', '/portfolio/motion', '/portfolio/stills', '/about/1', '/about/2', '/contact']

import { usePathname } from 'next/navigation'

export const useNavigationEvent = (setRouteTrigger, navigateTo) => {
  const pathname = usePathname() // Get current route
  const pathnameRef = useRef(pathname)
  const routeTriggersRef = useRef(useStore.getState().domTriggers.routeTriggers)

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        routeTriggersRef.current = newState.domTriggers.routeTriggers
      },
      (state) => state.domTriggers.routeTriggers !== routeTriggersRef.current,
    )
    return () => unsubscribe()
  }, [])


  useEffect(() => {
    // console.log('🚀 ~ file: Layout.jsx:19 ~ useNavigationEvent ~ pathname:', pathname)
    // console.log('🚀 ~ file: Layout.jsx:19 ~ useNavigationEvent ~ pathanemcurrent:', pathnameRef.current)
  }, [pathnameRef.current])


  useEffect(() => {
    // console.log('🚀 ~ file: Layout.jsx:32 ~ onPathnameChange ~ onPathnameChange:', pathname)
    // console.log('🚀 ~ file: Layout.jsx:32 ~ onPathnameChange ~ pathanemcurrent:', pathnameRef.current)
    // console.log('🚀 ~ file: Layout.jsx:32 ~ onPathnameChange ~ routetrigger:', routeTriggersRef)
    switch (pathnameRef.current) {
      case '/portfolio':
        setRouteTrigger(2)
        break
      case '/portfolio/motion':
        setRouteTrigger(3)
        break
      case '/portfolio/stills':
        setRouteTrigger(4)
        break
      case '/about/1':
        setRouteTrigger(5)
        break
      case '/about/2':
        setRouteTrigger(6)
        break
      case '/contact':
        setRouteTrigger(7)
        break
      default:
        break
    }
  }, [pathnameRef.current])

  const setRouteTriggerAndNavigate = async (routeTriggerValue, pathname) => {
    // console.log('🚀 ~ file: Layout.jsx:41 ~ setRouteTriggerAndNavigate ~ pathname:', pathname)
    // console.log('🚀 ~ file: Layout.jsx:41 ~ setRouteTriggerAndNavigate ~ routeTriggerValue:', routeTriggerValue)
    await setRouteTrigger(routeTriggerValue)
    navigateTo(pathname)
  }

  useEffect(() => {
    if (
      routeTriggersRef.current !== undefined &&
      pathnameRef.current !== pathnames[(routeTriggersRef.current - 1) % pathnames.length]
    ) {
      const newPathname = pathnames[(routeTriggersRef.current - 1) % pathnames.length]
      // console.log('🚀 ~ file: Layout.jsx:54 ~ useEffect ~ routeTriggersRef:', routeTriggersRef.current)
      setRouteTriggerAndNavigate(routeTriggersRef.current, newPathname)
    }
  }, [routeTriggersRef.current])
}

const Layout = ({ children }) => {
  const router = useRouter()
  const ref = useRef(null)

  const incrementMasterTrigger = useStore((state) => state.incrementMasterTrigger)

  const isAnimationPlayingRef = useRef(useStore.getState().isAnimationPlaying)

  const { setRouteTrigger } = useStore()

  const navigateTo = (pathname) => {
    router.push(pathname)
  }

  useNavigationEvent(setRouteTrigger, navigateTo)

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        isAnimationPlayingRef.current = newState.isAnimationPlaying
      },
      (state) => state.isAnimationPlaying !== isAnimationPlayingRef.current,
    )
    return () => unsubscribe()
  }, [])

  const handleWheel = useCallback(
    debounce(
      () => {
        console.log("handlewheel")
        console.log("🚀 ~ file: Layout.jsx:163 ~ Layout ~ isAnimationPlayingRef:", isAnimationPlayingRef)
        incrementMasterTrigger()
      },
      500,
      { leading: true, trailing: false },
    ),
    [isAnimationPlayingRef.current],
  )

  useEffect(() => {
    let refVar = ref.current
    ref.current.addEventListener('wheel', handleWheel)
    return () => refVar.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  // useEffect(() => {
  //   console.log('🚀 ~ file: Layout.jsx:54 ~ Layout ~ isAnimationPlayingRef.current:', isAnimationPlayingRef.current)
  // }, [isAnimationPlayingRef.current])

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
