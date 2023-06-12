import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, useAnimations, CameraShake, OrbitControls } from '@react-three/drei'
import usePlayAnimations from '@/helpers/hooks/usePlayAnimations'
import { useStore } from '@/helpers/store'

function Rig({ finalPosition, finalRotation, camera }) {
  console.log("🚀 ~ file: Mountains.jsx:9 ~ Rig ~ camera:", camera)
  console.log("🚀 ~ file: Mountains.jsx:9 ~ Rig ~ finalRotation:", finalRotation)
  console.log("🚀 ~ file: Mountains.jsx:9 ~ Rig ~ finalPosition:", finalPosition)
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

export default function Mountains(props) {
  const group = useRef()
  const CameraActionRef = useRef()
  const isAnimationPlayingRef = useRef(useStore.getState().isAnimationPlaying)
  const animationTriggersRef = useRef(useStore.getState().canvasTriggers.animationTriggers)

  const FirstPersonControlsRef = useRef()
  const [renderTrigger, setRenderTrigger] = useState(0)

  const { nodes, materials, animations } = useGLTF('/models/mountains.glb', true)
  const { mixer, actions } = useAnimations(animations, group)

  const [finalPosition, setFinalPosition] = useState()
  const [finalRotation, setFinalRotation] = useState()

  const onAnimationFinished = () => {
    setLocalIsAnimationPlaying(false)

    setFinalPosition(CameraActionRef.current.position.clone())
    setFinalRotation(CameraActionRef.current.rotation.clone())
  }
  
  usePlayAnimations(mixer, actions, onAnimationFinished)

  useEffect(() => {
    const unsubscribeAnimTriggers = useStore.subscribe(
      (newState) => {
        animationTriggersRef.current = newState.canvasTriggers.animationTriggers
      },
      (state) => {
        state.canvasTriggers.animationTriggers !== animationTriggersRef.current
      },
    )

    const unsubscribeAnimPlaying = useStore.subscribe(
      (newState) => {
        isAnimationPlayingRef.current = newState.isAnimationPlaying
      },
      (state) => {
        state.isAnimationPlaying !== isAnimationPlayingRef.current
      },
    )
    return () => {
      unsubscribeAnimPlaying()
      unsubscribeAnimTriggers()
    }
  }, [])

  return (
    <group ref={group} dispose={null} {...props}>
      <group name='Scene'>
        <PerspectiveCamera
          name='Camera1'
          makeDefault={false}
          ref={CameraActionRef}
          far={10000}
          near={0.1}
          fov={36.2 + 0}
          position={[-353.93, 88.44, 56.42]}
          rotation={[-0.42, -1.38, -0.41]}
        />
        <PerspectiveCamera
          name='Camera2'
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={36.2}
          position={[-353.93, 88.44, 56.42]}
          rotation={[1.46, -0.69, 1.4]}
        />
        <PerspectiveCamera
          name='Camera3'
          makeDefault={false}
          far={1000}
          near={0.1}
          fov={36.2}
          position={[-119.1, 114.33, 72.58]}
          rotation={[-0.08, -0.74, -0.05]}
        />
        <PerspectiveCamera
          name='Camera4'
          makeDefault={false}
          far={10000}
          near={0.1}
          fov={36.2}
          position={[-99.19, 118.3, 48.1]}
          // position={[-99.19, 5418.3, 48.1]}
          rotation={[-1.62, 0.04, 1.6]}
        />
        <PerspectiveCamera
          name='CameraAction'
          key='CameraAction'
          ref={CameraActionRef}
          makeDefault={true}
          far={1000000}
          near={0.1}
          fov={36.2 + 20}
          position={[-119.1, 114.33, 72.58]}
          rotation={[-0.08, -0.74, -0.05]}
        />
        {CameraActionRef.current && finalPosition && finalRotation && !isAnimationPlayingRef.current && animationTriggersRef.current !== 3 ? (
          <Rig finalPosition={finalPosition} finalRotation={finalRotation} camera={CameraActionRef.current} />
        ) : null}

        {/* {CameraActionRef.current && !localIsAnimationPlayingRef.current && animationTriggersRef.current !== 3 ? (
          <OrbitControls makeDefault />
        ) : null} */}

        <mesh
          name='EverestDistant1HD'
          castShadow
          receiveShadow
          geometry={nodes.EverestDistant1HD.geometry}
          position={[-101.24, 48.69, 505.31]}
        >
          <meshStandardMaterial map={materials.DistantMountainMat.map} />
        </mesh>
        <mesh
          name='EverestDistant2HD'
          castShadow
          receiveShadow
          geometry={nodes.EverestDistant2HD.geometry}
          position={[-100.5, 67.3, -555.05]}
        >
          <meshStandardMaterial map={materials.DistantMountainMat.map} />
        </mesh>
        <mesh name='EverestPeakHD' castShadow receiveShadow geometry={nodes.EverestPeakHD.geometry}>
          <meshStandardMaterial map={materials.PeakMountainMat.map} />
        </mesh>
        <mesh name='EverestMidHD' castShadow receiveShadow geometry={nodes.EverestMidHD.geometry}>
          <meshStandardMaterial map={materials.MidMountainMat.map} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/models/mountains.glb')
