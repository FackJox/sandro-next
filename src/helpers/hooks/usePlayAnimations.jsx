import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useStore } from '@/helpers/store'
import { CameraShake } from '@react-three/drei'
import { useAnimationsContext } from '@/helpers/AnimationsContext'

const usePlayAnimations = (mountAnimation) => {
  // console.log('🚀 ~ file: usePlayAnimations.jsx:8 ~ usePlayAnimations ~ mountAnimation:', mountAnimation)
  const { mixer, actions, setFinalPosition, setFinalRotation, cameraActionCurrent } = useAnimationsContext()
 
  const [localIsAnimationPlaying, setLocalIsAnimationPlaying] = useState(false)
  const localIsAnimationPlayingRef = useRef(localIsAnimationPlaying)
  const isAnimationPlayingRef = useRef(useStore.getState().isAnimationPlaying)
  const { setIsLoading, setIsInitialized, setIsAnimationPlaying } = useStore()

  const cameraActionRef = useRef(cameraActionCurrent)

  useEffect(() => {
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
    }
  }, [])

  useEffect(() => {
    cameraActionRef.current = cameraActionCurrent
  }, [cameraActionCurrent])

  useEffect(() => {
    if (mixer && actions && mountAnimation) {
      mixer.timeScale = 1.4
      mixer.stopAllAction()
      handleAnimations(mountAnimation)
    }
  }, [mixer, actions, mountAnimation])

  useEffect(() => {
    localIsAnimationPlayingRef.current = localIsAnimationPlaying
    console.log("🚀 ~ file: usePlayAnimations.jsx:46 ~ useEffect ~ localIsAnimationPlayingRef.current:", localIsAnimationPlayingRef.current)
    console.log("🚀 ~ file: usePlayAnimations.jsx:46 ~ useEffect ~ localIsAnimationPlaying:", localIsAnimationPlaying)
  }, [localIsAnimationPlaying])

  useEffect(() => {
    console.log(
      '🚀 ~ file: usePlayAnimations.jsx:52 ~ useEffect ~ localIsAnimationPlayingRef.current:',
      localIsAnimationPlayingRef.current,
    )
    setIsAnimationPlaying(localIsAnimationPlayingRef.current)
  }, [localIsAnimationPlaying])

  const handleAnimations = (mountAnimation) => {
    const currentAnimationName = `CameraAction${mountAnimation}`

    // console.log("🚀 ~ file: usePlayAnimations.jsx:55 ~ handleAnimations ~ currentAnimationName:", currentAnimationName)
    if (actions && !localIsAnimationPlayingRef.current && mountAnimation) {
      const currentAnimation = actions[currentAnimationName]

      mixer.stopAllAction()
      currentAnimation.reset()
      currentAnimation.timeScale = 1
      currentAnimation.setDuration(currentAnimation._clip.duration)
      currentAnimation.clampWhenFinished = true
      currentAnimation.loop = THREE.LoopOnce
      currentAnimation.play()
      setLocalIsAnimationPlaying(currentAnimation.isRunning())
      console.log("🚀 ~ file: usePlayAnimations.jsx:68 ~ handleAnimations ~ (currentAnimation.isRunning():", currentAnimation.isRunning())
      mixer.addEventListener('finished', onAnimationFinished)
    }
  }

  const onAnimationFinished = () => {
    if (cameraActionRef.current) {
      setLocalIsAnimationPlaying(false)

      setFinalPosition(cameraActionRef.current.position.clone())
      setFinalRotation(cameraActionRef.current.rotation.clone())

      mixer.removeEventListener('finished', onAnimationFinished)
    }
  }
}

export default usePlayAnimations
