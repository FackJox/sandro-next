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

const Loader = dynamic(() => import('@/components/dom/Loader').then((mod) => mod.Loader), {
  ssr: true,
})

export default function Scene({ ...props }) {
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

  const canvasRef = useRef()
  return (
    <Canvas ref={canvasRef} {...props} frameloop='demand' mode='concurrent'>
      {/* @ts-ignore */}
      <r3f.Out />
      {/* <Perf position={'bottom-left'} /> */}
      <AdaptiveDpr pixelated />

      <Sky />

      <group position={[0, -100, 0]}>
        <Mountains />
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
