'use client'

import { Canvas } from '@react-three/fiber'
import { Preload, Html, useProgress, AdaptiveDpr } from '@react-three/drei'
import { Suspense, useState, useEffect, useRef } from 'react'
import { Perf } from 'r3f-perf'
import dynamic from 'next/dynamic'

import { r3f } from '@/helpers/global'
import { useStore } from '@/helpers/store'
import DaySky from '@/components/canvas/DaySky/DaySky'
import NightSky from '@/components/canvas/NightSky/NightSky'
import Mountains from '@/components/canvas/Mountains/Mountains'
import { InstancedMountains, InstancesMountains } from '@/components/canvas/Mountains/InstancedMountains'

const Loader = dynamic(() => import('@/components/dom/Loader').then((mod) => mod.Loader), {
  ssr: true,
})

const lerpColor = (color1, color2, t) => {
  const r = color1.r + t * (color2.r - color1.r)
  const g = color1.g + t * (color2.g - color1.g)
  const b = color1.b + t * (color2.b - color1.b)
  return { r, g, b }
}

const hexToRgb = (hex) => ({
  r: (hex >> 16) & 255,
  g: (hex >> 8) & 255,
  b: hex & 255,
})

const rgbToHex = (rgb) => (rgb.r << 16) | (rgb.g << 8) | rgb.b

export default function Scene({ ...props }) {
  const [showNightSky, setShowNightSky] = useState(true)
  const [fogColour, setFogColor] = useState(0x4a3f40)
  const prevSunCycleRef = useRef(null)

  const sunCycleRef = useRef(useStore.getState().sunCycle)
  // console.log("🚀 ~ file: Scene.jsx:27 ~ Scene ~ sunCycleRef:", sunCycleRef)

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        sunCycleRef.current = newState.sunCycle
      },
      (state) => state.sunCycle !== sunCycleRef.current,
    )
    return () => unsubscribe()
  }, [])

  const animateFogColor = (startColor, endColor, duration, setFogColor) => {
    const startTime = performance.now()
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime
      const t = Math.min(elapsed / duration, 1)
      const lerpedColor = lerpColor(startColor, endColor, t)
      setFogColor(rgbToHex(lerpedColor))

      if (t < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }

  useEffect(() => {
    const currentCondition = sunCycleRef.current < 1
    if (prevSunCycleRef.current === currentCondition) {
      return
    }

    const startColor = currentCondition ? 0x808080 : 0x4a3f40
    const endColor = currentCondition ? 0x4a3f40 : 0x808080

    animateFogColor(hexToRgb(startColor), hexToRgb(endColor), 5500, setFogColor)

    prevSunCycleRef.current = currentCondition
  }, [sunCycleRef.current])

  useEffect(() => {
    if (sunCycleRef.current < -100) {
      setShowNightSky(true)
    } else {
      setShowNightSky(false)
    }
  }, [sunCycleRef.current])

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
    <Canvas ref={canvasRef} {...props} frameloop='demand' mode='concurrent' >
      {/* @ts-ignore */}
      <r3f.Out />
      {/* <Perf position={'bottom-left'} /> */}
      <AdaptiveDpr pixelated />
      <fogExp2 attach='fog' color={fogColour} density={0.0035} />

      <DaySky />
      {showNightSky && <NightSky />}

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
