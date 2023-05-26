import React, { useState, useRef, useEffect } from 'react'
import { Sky as DaySky } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '@/helpers/store'
import NightSky from '../NightSky/NightSky'

import { lerpColor, hexToRgb, rgbToHex, animateFogColor } from '@/helpers/colours'

export default function Sky() {
  const [angleTraversed, setAngleTraversed] = useState(0)
  const sunTriggersRef = useRef(useStore.getState().canvasTriggers.sunTriggers)
  const { setSunCycleTriggers } = useStore()
  const [sunPosition, setSunPosition] = useState([])
  const [sunRotations, setSunRotations] = useState(0)
  const [sunRotating, setSunRotating] = useState(false)

  const distanceFromCenter = 450000

  useEffect(() => {
    const initialSunRadiusPosition = [1, 1, 1]
    const initialSunPos = new THREE.Vector3(-353.93, 88.44, 56.42).clone().add(new THREE.Vector3(0, -1000, 0))
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
    if (!wireMeshRef.current && sunPosition && sunTriggersRef.current < 2) {
      setSunRotating(true)
    }
  }, [sunTriggersRef.current])

//   useEffect(() => {
//     // Synchronize localSunCycle with the global state
//     setSunCycle(localSunCycle)
//   }, [localSunCycle, setSunCycle])

  // > 0.231

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

      setLocalSunCycle(nextSunPos.y)
      setSunPosition((prevSunPosition) => {
        return nextSunPos.toArray()
      })
    }
  })

  const [rayleigh, setRayleigh] = useState(-8.0)
  const rayleighRef = useRef(rayleigh)

  useEffect(() => {
    rayleighRef.current = rayleigh
    // console.log("🚀 ~ file: DaySky.jsx:89 ~ useEffect ~ rayleighRef.current:", rayleighRef.current)
    // console.log("🚀 ~ file: DaySky.jsx:90 ~ useEffect ~ rayleigh:", rayleigh)
  }, [rayleigh])

  // useEffect(() => {
  // 	const startRayleigh = rayleigh;
  // 	const targetRayleigh = sunCycle < -100 ? 0.5 : -8.0 ;
  // 	const duration = 5.5 * 1000

  // 	const startTime = performance.now();
  // 	const updateRayleigh = () => {
  // 	  const elapsed = performance.now() - startTime;
  // 	  const progress = Math.min(elapsed / duration, 1);

  // 	  setRayleigh(Math.max(-10.0, Math.min(0.5, THREE.MathUtils.lerp(startRayleigh, targetRayleigh, progress))));
  // 	//   console.log("🚀 ~ file: DaySky.jsx:106 ~ updateRayleigh ~ rayleigh.current:", rayleighRef.current)
  // 	  if (progress < 1) {
  // 		requestAnimationFrame(updateRayleigh);
  // 	  }
  // 	};

  // 	updateRayleigh();
  //   }, [sunCycle]);

  // useEffect(() => {
  // 	console.log("🚀 ~ file: DaySky.jsx:117 ~ useEffect ~ rayleighRef.current:", rayleighRef.current)
  // }, [rayleighRef.current])

  const [showNightSky, setShowNightSky] = useState(true)
  const [fogColour, setFogColor] = useState(0x4a3f40)
  const { sunCycle, setSunCycle } = useStore((state) => ({
    sunCycle: state.sunCycle,
    setSunCycle: state.setSunCycle,
  }))
  const [localSunCycle, setLocalSunCycle] = useState(sunCycle)
  const prevSunCycleRef = useRef(null)

  const sunCycleRef = useRef(useStore.getState().sunCycle)
  useEffect(() => {
    const unsubscribeSunTriggers = useStore.subscribe(
      (newState) => {
        sunTriggersRef.current = newState.canvasTriggers.sunTriggers
      },
      (state) => {
        state.canvasTriggers.sunTriggers !== sunTriggersRef.current
      },
    )

    return () => {
      unsubscribeSunTriggers()
    }
  }, [])

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
    if (localSunCycle < -100) {
      setShowNightSky(true)
    } else {
      setShowNightSky(false)
    }
  }, [localSunCycle])

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
