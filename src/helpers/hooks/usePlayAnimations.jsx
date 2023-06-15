import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useStore } from '@/helpers/store'
import { CameraShake } from '@react-three/drei'
import { useAnimationsContext } from '@/helpers/AnimationsContext'

const usePlayAnimations = (mountAnimation) => {
  const { mixer, actions, setFinalPosition, setFinalRotation, cameraActionCurrent } = useAnimationsContext()

  const [localIsAnimationPlaying, setLocalIsAnimationPlaying] = useState(false)
  const localIsAnimationPlayingRef = useRef(localIsAnimationPlaying)
  const { setIsLoading, setIsInitialized } = useStore()

  const cameraActionRef = useRef(cameraActionCurrent)

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
    setLocalIsAnimationPlaying((prevState) => {
      localIsAnimationPlayingRef.current = prevState
      return prevState
    })
    console.log("🚀 ~ file: usePlayAnimations.jsx:31 ~ usePlayAnimations ~ localIsAnimationPlaying:", localIsAnimationPlaying)
    console.log("🚀 ~ file: usePlayAnimations.jsx:31 ~ setLocalIsAnimationPlaying ~ localIsAnimationPlayingRef.current:", localIsAnimationPlayingRef.current)
  }, [localIsAnimationPlaying])
  
  const handleAnimations = (mountAnimation) => {
    const currentAnimationName = `CameraAction${mountAnimation}`
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

  const getLocalIsAnimationPlaying = () => {
    console.log(
      '🚀 ~ file: usePlayAnimations.jsx:67 ~ getLocalIsAnimationPlaying ~ localIsAnimationPlayingRef.current:',
      localIsAnimationPlayingRef.current,
    )
    return localIsAnimationPlayingRef.current
  }

  return getLocalIsAnimationPlaying
}

export default usePlayAnimations
