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

  useFrame(() => {
    vec.set(finalPosition.x + mouse.x * 2, finalPosition.y, finalPosition.z)
    camera.position.lerp(vec, 0.05)
  })

  return (
    <CameraShake
      maxYaw={0.01}
      maxPitch={0.01}
      maxRoll={0.01}
      yawFrequency={0.5}
      pitchFrequency={0.5}
      rollFrequency={0.4}
    />
  )
}
