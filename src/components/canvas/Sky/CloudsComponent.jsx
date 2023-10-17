import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Clouds, Cloud } from '@react-three/drei'

export const CloudsComponent = () => {
  const { camera } = useThree()

  const randomPosition = [
    camera.position.x + Math.random() * 10 - 5,
    camera.position.y + Math.random() * 10 - 5,
    camera.position.z + Math.random() * 10 - 5,
  ]

  const cloudRef = useRef()
  // let rotationSpeed

  // useEffect(() => {
  //   rotationSpeed = Math.random() * 0.02
  // }, [])

  // useFrame(() => {
  //   cloudRef.current.rotation.y += rotationSpeed
  // })

  return <Cloud ref={cloudRef} position={randomPosition} speed={0.2} scale={2} volume={5} color='hotpink' fade={1000} />
}
