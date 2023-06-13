'use client'
import { useRef, useEffect, useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash'
import { AnimationsContext } from '@/helpers/AnimationsContext'

import { useStore } from '@/helpers/store'
import { handleAnimations } from '@/components/canvas/Mountains/Mountains'

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
