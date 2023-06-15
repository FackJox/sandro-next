import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useStore } from '@/helpers/store'
import { CameraShake } from '@react-three/drei'
import { useAnimationsContext } from '@/helpers/AnimationsContext'

const usePlayAnimations = (mountAnimation) => {
  const { mixer, actions, setFinalPosition, setFinalRotation, cameraActionCurrent } = useAnimationsContext()
  const [forceUpdate, setForceUpdate] = useState(false)

  const [localIsAnimationPlaying, setLocalIsAnimationPlaying] = useState(false)
  const { setIsLoading, setIsInitialized } = useStore()

  const cameraActionRef = useRef(cameraActionCurrent)

  useEffect(() => {
    cameraActionRef.current = cameraActionCurrent
  }, [cameraActionCurrent])

  useEffect(() => {
    if (mixer && actions && mountAnimation) {
      mixer.timeScale = 0.4
      mixer.stopAllAction()
      handleAnimations(mountAnimation)
    }
  }, [mixer, actions, mountAnimation])

  useEffect(() => {
    console.log('🚀 ~ file: usePlayAnimations.jsx:32 ~ useEffect ~ localIsAnimationPlaying:', localIsAnimationPlaying)
    
  }, [localIsAnimationPlaying])

  const handleAnimations = (mountAnimation) => {
    setLocalIsAnimationPlaying((prevState) => {
      const newState = !prevState
      return newState
    })
    setForceUpdate((prev) => !prev)
    const currentAnimationName = `CameraAction${mountAnimation}`
    if (actions && !localIsAnimationPlaying && mountAnimation) {
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
      '🚀 ~ file: usePlayAnimations.jsx:67 ~ getLocalIsAnimationPlaying ~ localIsAnimationPlaying:',
      localIsAnimationPlaying,
    )
    return localIsAnimationPlaying
  }

  return getLocalIsAnimationPlaying
}

export default usePlayAnimations
