import React, { useState, useRef, useEffect } from 'react'
import { Sky as DaySky, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '@/helpers/store'
import NightSky from './NightSky'

import { lerpColor, hexToRgb, rgbToHex, animateFogColor } from '@/helpers/colours'




export default function Sky() {
  const [sunPosition, setSunPosition] = useState([])
  const [sunRotating, setSunRotating] = useState(false)
  const [showNightSky, setShowNightSky] = useState(true)
  const [fogColour, setFogColor] = useState(0x4a3f40)
  const prevSunCycleRef = useRef(null)
  const [dayNightCycle, setDayNightCycle] = useState(true)
  const sunCycleRef = useRef(useStore.getState().sunCycle)
  const [localSunCycle, setLocalSunCycle] = useState(sunCycleRef)
  const localSunCycleRef = useRef(localSunCycle)
  const { pageInView } = useStore()
  

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        sunCycleRef.current = newState.sunCycle
      },
      (state) => state.sunCycle !== sunCycleRef.current,
    )
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    localSunCycleRef.current = localSunCycle
  }, [localSunCycle])

  useEffect(() => {
    if (sunCycleRef.current) {
      toggleDayNightCycle()
    }
  }, [sunCycleRef.current])

  const toggleDayNightCycle = async () => {
    setDayNightCycle(sunCycleRef.current)

    while (localSunCycleRef.current.y >= -100) {
      await new Promise((resolve) => {
        setTimeout(resolve, 750)
      })
    }

    setSunRotating((sunRotating) => {
      console.log("🚀 ~ file: Sky.jsx:45 ~ toggleDayNightCycle ~ sunRotating:", sunRotating)
      return !sunRotating
    })
    console.log('day night status', dayNightCycle)
  }

  const initialSunPos = new THREE.Vector3(-353.93, 88.44, 56.42).clone().add(new THREE.Vector3(0, -1000, 0))

 

  useEffect(() => {
    const initialSunRadiusPosition = [1, 1, 1]
    setSunPosition(initialSunPos.toArray())
  }, [])

  const wireMeshRef = useRef(useStore.getState().wireMesh)

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        wireMeshRef.current = newState.wireMesh
      },
      (state) => state.wireMesh !== wireMeshRef.current,
    )
    return () => unsubscribe()
  }, [])

  

  useEffect(() => {
    if (!wireMeshRef.current && sunPosition) {
      setSunRotating(true)
    }
  }, [pageInView])


  const distanceFromCenter = 450000
  const sunCentre = new THREE.Vector3(-353.93, 88.44, 56.42)
  const orbitAxis = new THREE.Vector3(-(180 * Math.PI) / 180, (90 * Math.PI) / 180, (180 * Math.PI) / 180)
  const speed = 0.06

  useFrame(() => {
    if (wireMeshRef.current) {
      const initialSunRadiusPosition = [1, 1, 1]
      const initialSunPos = new THREE.Vector3(-353.93, 88.44, 56.42).clone().add(new THREE.Vector3(0, -1000, 0))
      setLocalSunCycle(initialSunPos.y)
      setSunPosition((prevSunPosition) => {
        return initialSunPos.toArray()
      })
    }

    if (sunPosition.length > 0 && sunRotating) {
      const prevSunPos = new THREE.Vector3().fromArray(sunPosition)
      const nextSunPos = prevSunPos
        .clone()
        .sub(sunCentre)
        .applyAxisAngle(orbitAxis, (speed * Math.PI) / 180)
        .add(sunCentre)

      if (dayNightCycle || initialSunPos.distanceTo(nextSunPos) > 1) {
        setLocalSunCycle(nextSunPos)
        setSunPosition((prevSunPosition) => {
          return nextSunPos.toArray()
        })
      }
    }
  })



  useEffect(() => {
    const currentCondition = localSunCycle < 1
    if (prevSunCycleRef.current === currentCondition) {
      return
    }

    const startColor = currentCondition ? 0x808080 : 0x4a3f40
    const endColor = currentCondition ? 0x4a3f40 : 0x808080

    animateFogColor(hexToRgb(startColor), hexToRgb(endColor), 5500, setFogColor)

    prevSunCycleRef.current = currentCondition
  }, [localSunCycle])



  useEffect(() => {
    if (localSunCycleRef.current) {
      if (localSunCycleRef.current.y < -100 && pageInView == 'portfolio') {
        setShowNightSky(true)
        setSunRotating(false)

      } else if (localSunCycleRef.current.y < -100 ) {
        setShowNightSky(true)
      } else {
        setShowNightSky(false)
      }
    }
  }, [localSunCycleRef.current])

  return (
    <>
      <directionalLight intensity={0.2} position={sunPosition} />
      <fogExp2 attach='fog' color={fogColour} density={0.0035} />
      {showNightSky && <NightSky />}
      <DaySky
        azimuth={0.25} // Sun rotation around the Y axis from 0 to 1 (default=0.25)
        turbidity={1.5} // Turbidity (1-3) - higher values create more scattering and a brighter sky (default=1)
        rayleigh={0.5} // Rayleigh scattering (1-3) - higher values create more scattering and a bluer sky (default=0.5)
        elevation={-20000} // Sun elevation in meters (default=-20000)
        inclination={0} // Sun elevation angle from 0 to 1 (default=0)
        distance={distanceFromCenter}
        sunPosition={sunPosition}
      />
    </>
  )
}