import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useStore } from '@/helpers/store'
import { CameraShake } from '@react-three/drei'

const usePlayAnimations = (mixer, actions, setFinalPosition, setFinalRotation, cameraActionCurrent) => {
  const [localIsAnimationPlaying, setLocalIsAnimationPlaying] = useState(false)
  const localIsAnimationPlayingRef = useRef(localIsAnimationPlaying)
  const animationTriggersRef = useRef(useStore.getState().canvasTriggers.animationTriggers)
  const isAnimationPlayingRef = useRef(useStore.getState().isAnimationPlaying)
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

  const cameraActionRef = useRef(cameraActionCurrent)

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
    cameraActionRef.current = cameraActionCurrent
    console.log('🚀 ~ file: usePlayAnimations.jsx:34 ~ usePlayAnimations ~ cameraActionRef:', cameraActionRef)
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
  }, [localIsAnimationPlayingRef.current])

  useEffect(() => {
    if (animationTriggersRef.current >= 6) {
      resetIndexTriggersStores()
      resetPlayedAnimations()
    }
  }, [animationTriggersRef.current])

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
    // setRenderTrigger((prev) => prev + 1)
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
