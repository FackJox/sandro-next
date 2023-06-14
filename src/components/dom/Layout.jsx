'use client'
import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { AnimationsContext } from '@/helpers/AnimationsContext'

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false })



const Layout = ({ children }) => {
  const ref = useRef(null)
 


  const [contextValue, setContextValue] = useState({
    mixer: null,
    actions: null,
    setFinalPosition: null,
    setFinalRotation: null,
    cameraActionCurrent: null,
  })

  return (
    <AnimationsContext.Provider value={contextValue}>
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
          setContextValue={setContextValue}
        />
      </div>
    </AnimationsContext.Provider>
  )
}

export { Layout }
