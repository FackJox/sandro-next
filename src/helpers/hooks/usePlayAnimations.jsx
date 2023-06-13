import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useStore } from '@/helpers/store'
import { CameraShake } from '@react-three/drei'
import { useAnimationsContext } from '@/helpers/AnimationsContext'

const usePlayAnimations = (mountAnimation) => {
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
    if (mixer) {
      mixer.timeScale = 1.5
    }
  }, [mixer])

  useEffect(() => {
    localIsAnimationPlayingRef.current = localIsAnimationPlaying
  }, [localIsAnimationPlaying])

  useEffect(() => {
    setIsAnimationPlaying(localIsAnimationPlayingRef.current)
    console.log('localIsAnimationPlayingRef', localIsAnimationPlayingRef.current)
  }, [localIsAnimationPlayingRef])

  useEffect(() => {
    setIsLoading(false)
    mixer.stopAllAction()
    setIsInitialized(true)

    if (actions && mountAnimation) {
      handleAnimations()
    }
  }, [])

  const handleAnimations = (mountAnimation) => {
    const currentAnimationName = `CameraAction${mountAnimation}`

    if (actions && !localIsAnimationPlayingRef.current) {
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
}

export default usePlayAnimations
