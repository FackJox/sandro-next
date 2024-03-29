'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, Html, useProgress, AdaptiveDpr } from '@react-three/drei'
import { Suspense, useState, useEffect, useRef } from 'react'
import { Perf } from 'r3f-perf'
import dynamic from 'next/dynamic'

import { r3f } from '@/helpers/global'
import { useStore } from '@/helpers/store'
import Sky from '@/components/canvas/Sky/Sky'
import NightSky from '@/components/canvas/Sky/NightSky'
import Mountains from '@/components/canvas/Mountains/Mountains'
import { InstancedMountains, InstancesMountains } from '@/components/canvas/Mountains/InstancedMountains'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

const Loader = dynamic(() => import('@/components/dom/Loader').then((mod) => mod.Loader), {
  ssr: true,
})

export default function Scene({ contextValue, setContextValue, ...props }) {
  const [loadInstance, setLoadInstance] = useState(false)
  const scalingParams = {
    scaleY: 1,
    scaleXZ: 4.3,
    posMult: 2.4,
  }

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    console.log('🚀 ~ file: Scene.jsx:44 ~ useEffect ~ loadInstance:', loadInstance)
    setLoadInstance(true)
    console.log('🚀 ~ file: Scene.jsx:45 ~ useEffect ~ loadInstance:', loadInstance)
  }, [contextValue])

  const canvasRef = useRef()
  return (
    <Canvas ref={canvasRef} {...props} updateDefaultCamera={false}>
      {/* @ts-ignore */}
      <r3f.Out />
      {/* <Perf position={'bottom-left'} /> */}
      <AdaptiveDpr pixelated />

      <EffectComposer>
        <DepthOfField
          focusDistance={0.9} // where to focus
          focalLength={0.2} // focal length
          bokehScale={6} // bokeh size
        />
      </EffectComposer>

      <Sky />

      <group position={[0, -100, 0]}>
        <Mountains setContextValue={setContextValue} />

        <InstancesMountains>
          <InstancedMountains
            key='top'
            position={[1484 * scalingParams.posMult, 0, 0]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />
          <InstancedMountains
            key='bottom'
            position={[-1893.5 * scalingParams.posMult, 0, 0]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />

          <InstancedMountains
            key='left'
            position={[0, 0, -1848.5 * scalingParams.posMult]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />
          <InstancedMountains
            key='right'
            position={[0, 0, 2011 * scalingParams.posMult]}
            rotation={[0, (180 * Math.PI) / 180, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />

          <InstancedMountains
            key='topleft'
            position={[1484 * scalingParams.posMult, 0, -1848.5 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />
          <InstancedMountains
            key='topright'
            position={[1484 * scalingParams.posMult, 0, 2011 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />

          <InstancedMountains
            key='bottomleft'
            position={[-1893.5 * scalingParams.posMult, 0, -1848.5 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />
          <InstancedMountains
            key='bottomright'
            position={[-1893.5 * scalingParams.posMult, 0, 2011 * scalingParams.posMult]}
            rotation={[0, 0, 0]}
            scale={[-scalingParams.scaleXZ, scalingParams.scaleY, -scalingParams.scaleXZ]}
            castShadows={false}
            recieveShadows={false}
          />
        </InstancesMountains>
      </group>

      <Preload all />
    </Canvas>
  )
}
