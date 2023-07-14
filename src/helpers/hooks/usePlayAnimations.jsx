import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useStore } from '@/helpers/store'
import { CameraShake } from '@react-three/drei'
import { useAnimationsContext } from '@/helpers/AnimationsContext'

const usePlayAnimations = (mountAnimation) => {
  const { mixer, actions, setFinalPosition, setFinalRotation, cameraActionCurrent } = useAnimationsContext()
  const [localIsAnimationPlaying, setLocalIsAnimationPlaying] = useState(false)
  const localIsAnimationPlayingRef = useRef(localIsAnimationPlaying)
  const { setIsLoading, setIsInitialized, setIsAnimationPlaying, lastPlayedMountAnimation, setLastPlayedMountAnimation } = useStore()
  const isAnimationPlayingRef = useRef(useStore.getState().isAnimationPlaying)
  const lastPlayedMountAnimationRef = useRef(useStore.getState().lastPlayedMountAnimation)


  const cameraActionRef = useRef(cameraActionCurrent)

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        isAnimationPlayingRef.current = newState.isAnimationPlaying
      },
      (state) => {
        state.isAnimationPlaying !== isAnimationPlayingRef.current
      },
    )
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        lastPlayedMountAnimationRef.current = newState.lastPlayedMountAnimation
      },
      (state) => {
        state.lastPlayedMountAnimation !== lastPlayedMountAnimationRef.current
      },
    )
    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    cameraActionRef.current = cameraActionCurrent
  }, [cameraActionCurrent])
  

  useEffect(() => {
    // console.log("lastPlayedMountAnimation", lastPlayedMountAnimationRef.current)
    // console.log("mountAnimation", mountAnimation)
    if (mixer && actions && mountAnimation && mountAnimation !== lastPlayedMountAnimationRef.current) {
      mixer.timeScale = 1.5
      mixer.stopAllAction()
      handleAnimations(mountAnimation)
    }
  }, [mixer, actions, mountAnimation])

  useEffect(() => {
    localIsAnimationPlayingRef.current = localIsAnimationPlaying
  }, [localIsAnimationPlaying])


  // useEffect(() => {
  //   setIsAnimationPlaying(localIsAnimationPlaying)
  // }, [localIsAnimationPlaying])


  const handleAnimations = (mountAnimation) => {
    const currentAnimationName = `CameraAction${mountAnimation}`
    // console.log("mountAnimation", mountAnimation)
    if (actions && !localIsAnimationPlayingRef.current && mountAnimation ) {
      const currentAnimation = actions[currentAnimationName]

      mixer.stopAllAction()
      currentAnimation.reset()
      currentAnimation.timeScale = 1
      currentAnimation.setDuration(currentAnimation._clip.duration)
      currentAnimation.clampWhenFinished = true
      currentAnimation.loop = THREE.LoopOnce
      currentAnimation.play()
      setLocalIsAnimationPlaying(currentAnimation.isRunning())
      setIsAnimationPlaying(currentAnimation.isRunning())
      mixer.addEventListener('finished', onAnimationFinished)

      // Store the last played mountAnimation number
      setLastPlayedMountAnimation(mountAnimation)
    }
  }

  const onAnimationFinished = () => {
    if (cameraActionRef.current) {
      // console.log('INANIMATIONFINISHED')
      setLocalIsAnimationPlaying(false)
      setIsAnimationPlaying(localIsAnimationPlaying)
      setFinalPosition(cameraActionRef.current.position.clone())
      setFinalRotation(cameraActionRef.current.rotation.clone())

      mixer.removeEventListener('finished', onAnimationFinished)
    }
  }
}

export default usePlayAnimations