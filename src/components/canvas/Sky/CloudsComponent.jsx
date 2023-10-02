import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useRef, useEffect } from 'react'
import { Clouds, Cloud } from '@react-three/drei'

export const CloudsComponent = () => {

  const randomPosition = [
    Math.random() * 1000 - 500, // x position between -500 and 500
    Math.random() * 47 + 3, // y position between 3 and 50
    Math.random() * 1000 - 500, // z position between -500 and 500
  ]

   const cloudRef = useRef()
   let rotationSpeed

   useEffect(() => {
     rotationSpeed = Math.random() * 0.02 // Random speed between 0 and 0.02
   }, [])

   useFrame(() => {
     // Rotate the cloud around the y axis
     cloudRef.current.rotation.y += rotationSpeed
   })



  return (
    
      <Cloud ref={cloudRef} position={randomPosition} speed={0.2} scale={2} volume={5} color='hotpink' fade={1000} />
  )
}
