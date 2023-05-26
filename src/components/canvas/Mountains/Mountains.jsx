import React, { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import {
  useGLTF,
  PerspectiveCamera,
  useAnimations,
  CameraShake,
  OrbitControls,
} from '@react-three/drei'

import { useStore } from '@/helpers/store'

function Rig({ finalPosition, finalRotation, camera }) {
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
  const {
    initialized,
    isLoading,
    setIsLoading,
    setIsInitialized,
    setWireMesh,
    incrementMasterTrigger,
    incrementTextTrigger,
    resetIndexTriggersStores,
    setIsAnimationPlaying,
  } = useStore()
  const [localIsAnimationPlaying, setLocalIsAnimationPlaying] = useState(true)
  const localIsAnimationPlayingRef = useRef(localIsAnimationPlaying)
  const [finalPosition, setFinalPosition] = useState()
  const [finalRotation, setFinalRotation] = useState()

  const group = useRef()
  const CameraActionRef = useRef()
  const FirstPersonControlsRef = useRef()
  const [renderTrigger, setRenderTrigger] = useState(0)

  const { nodes, materials, animations } = useGLTF('/models/mountains.glb', true)
  const { mixer, actions } = useAnimations(animations, group)

  const animationTriggersRef = useRef(useStore.getState().canvasTriggers.animationTriggers)
  const isAnimationPlayingRef = useRef(useStore.getState().isAnimationPlaying)


  useEffect(() => {
    if (mixer) {
      mixer.timeScale = 1.5
    }
  }, [mixer])

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

  useEffect(() => {
    localIsAnimationPlayingRef.current = localIsAnimationPlaying
  }, [localIsAnimationPlaying])

  useEffect(() => {
    if (actions && animationTriggersRef.current == 1) {
      setIsLoading(false)
      mixer.stopAllAction()
      actions.CameraAction1.reset()
      actions.CameraAction1.play()
      actions.CameraAction1.clampWhenFinished = true
      actions.CameraAction1.loop = THREE.LoopOnce
      setIsInitialized(true)
      setLocalIsAnimationPlaying(actions.CameraAction1.isRunning())
      mixer.addEventListener('finished', onAnimationFinished)

      let ticker = setInterval(() => {
        const progress = actions.CameraAction1.time / actions.CameraAction1._clip.duration

        if (progress.toFixed(1) == 0.6) {
          incrementTextTrigger()
        }
      }, 100)

      actions.CameraAction1._clip.tracks.forEach((track) => {
        const times = track.times
        const endTime = times[times.length - 1]
        setTimeout(() => clearInterval(ticker), endTime * 1000 + 500)
      })
    }
  }, [actions])

  useEffect(() => {
    resetPlayedAnimations()
    if (actions) {
      handleAnimations()
    }
  }, [animationTriggersRef.current])

  useEffect(() => {
    incrementMasterTrigger()
  }, [isAnimationPlayingRef.current])

  const onAnimationFinished = () => {
    setLocalIsAnimationPlaying(false)

    setFinalPosition(CameraActionRef.current.position.clone())
    setFinalRotation(CameraActionRef.current.rotation.clone())
  }

  useEffect(() => {
    if (animationTriggersRef.current >= 6) {
      resetIndexTriggersStores()
      resetPlayedAnimations()
    }
  }, [animationTriggersRef.current])

  useEffect(() => {
    setIsAnimationPlaying(localIsAnimationPlaying)
  }, [localIsAnimationPlaying])

  const prevPlayedAnimationsRef = useRef(new Set())
  const [playedAnimations, setPlayedAnimations] = useState(new Set())
  const resetPlayedAnimations = () => {
    setPlayedAnimations(new Set())
  }

  useEffect(() => {
    const prevPlayedAnimations = prevPlayedAnimationsRef.current

    if (prevPlayedAnimations && !localIsAnimationPlayingRef.current) {
    }

    prevPlayedAnimationsRef.current = playedAnimations
  }, [playedAnimations])

  const handleAnimations = () => {
    setRenderTrigger((prev) => prev + 1)
    const playedAnimations = prevPlayedAnimationsRef.current
    const currentAnimationName = `CameraAction${animationTriggersRef.current}`
    if (actions && !localIsAnimationPlayingRef.current && !playedAnimations.has(currentAnimationName)) {
      const currentAnimation = actions[currentAnimationName]
      setPlayedAnimations((prevPlayedAnimations) => {
        const updatedSet = new Set(prevPlayedAnimations)
        updatedSet.add(currentAnimationName)
        return updatedSet
      })

      if (currentAnimation && animationTriggersRef.current >= 2 && !playedAnimations.has(currentAnimationName)) {
        mixer.stopAllAction()
        currentAnimation.reset()
        currentAnimation.timeScale = 1
        currentAnimation.setDuration(currentAnimation._clip.duration)
        currentAnimation.clampWhenFinished = true
        currentAnimation.loop = THREE.LoopOnce
        currentAnimation.play()
        setLocalIsAnimationPlaying(currentAnimation.isRunning())
        mixer.addEventListener('finished', onAnimationFinished)
      }
    }
  }


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
        {CameraActionRef.current && !localIsAnimationPlayingRef.current && animationTriggersRef.current !== 3 ? (
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
