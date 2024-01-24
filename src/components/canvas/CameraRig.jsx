import { useEffect, useState } from 'react'
import { CameraShake } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export function CameraRig({ finalPosition, finalRotation, camera }) {
 
  useEffect(() => {
    camera.position.copy(finalPosition)
    camera.rotation.copy(finalRotation)
  }, [camera, finalPosition, finalRotation])

  const [vec] = useState(() => new THREE.Vector3())
  const { mouse } = useThree()
  const [gyroX, setGyroX] = useState(0)

  const handleDeviceOrientation = (event) => {
    const { beta } = event
    setGyroX(beta)
  }

  useEffect(() => {
    window.addEventListener('deviceorientation', handleDeviceOrientation)

    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation)
    }
  }, [])

  useFrame(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent)

    if (isMobile) {
      vec.set(finalPosition.x + gyroX * 0.01, finalPosition.y, finalPosition.z)
    } else {
      vec.set(finalPosition.x + mouse.x * 2, finalPosition.y, finalPosition.z)
    }

    camera.position.lerp(vec, 0.05)
  })

  return (
    <CameraShake
      maxYaw={0.005}
      maxPitch={0.005}
      maxRoll={0.005}
      yawFrequency={0.2}
      pitchFrequency={0.2}
      rollFrequency={0.2}
    />
  )
}
