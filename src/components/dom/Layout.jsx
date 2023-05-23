'use client'
import { useRef, useEffect, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash'

import { useStore } from '@/helpers/store'
import { handleAnimations } from '@/components/canvas/Mountains/Mountains'  

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })

const Layout = ({ children }) => {
  const { incrementMasterTrigger } = useStore()
  const ref = useRef()
  const router = useRouter()
  const [scrollCount, setScrollCount] = useState(0)

  const pathnames = ['/', '/portfolio', '/about', '/contact']

  const handleWheel = useCallback(
    debounce(
      () => {
        incrementMasterTrigger()
        if (router.pathname === '/contact') {
          setScrollCount(0)
        } else {
          setScrollCount((prevCount) => (prevCount + 1) % pathnames.length)
        }
      },
      1000,
      { leading: true, trailing: false },
    ),
    [router],
  )

  useEffect(() => {
    router.push(pathnames[scrollCount])
  }, [scrollCount])

  useEffect(() => {
    ref.current.addEventListener('wheel', handleWheel)
    return () => {
      if (ref.current) {
        ref.current.removeEventListener('wheel', handleWheel)
      }
    }
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
