  import { useEffect, useRef, useState } from 'react'
  import * as THREE from 'three'
  import { useStore } from '@/helpers/store'
  import { CameraShake } from '@react-three/drei'
  import { useAnimationsContext } from '@/helpers/AnimationsContext'

  const usePlayAnimations = (mountAnimation) => {
    const { mixer, actions, setFinalPosition, setFinalRotation, cameraActionCurrent } = useAnimationsContext()
    const [localIsAnimationPlaying, setLocalIsAnimationPlaying] = useState(false)
    const { setIsLoading, setIsInitialized, setIsAnimationPlaying } = useStore()
    const cameraActionRef = useRef(cameraActionCurrent)
    const localIsAnimationPlayingRef = useRef(localIsAnimationPlaying)
    const isAnimationPlayingRef = useRef(useStore.getState().isAnimationPlaying)

    // useEffect(() => {
    //   localIsAnimationPlayingRef.current = localIsAnimationPlaying
    //   console.log("🚀 ~ file: usePlayAnimations.jsx:17 ~ useEffect ~ localIsAnimationPlaying:", localIsAnimationPlaying)
    // }, [localIsAnimationPlaying])

    useEffect(() => {
      setIsAnimationPlaying(localIsAnimationPlaying)
      // console.log('isAnimationPlayingRef', localIsAnimationPlaying)
    }, [localIsAnimationPlaying])

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
      cameraActionRef.current = cameraActionCurrent
      console.log("🚀 ~ file: usePlayAnimations.jsx:41 ~ useEffect ~ cameraActionCurrent:", cameraActionCurrent)
      console.log("🚀 ~ file: usePlayAnimations.jsx:41 ~ useEffect ~ cameraActionRef.current:", cameraActionRef.current)
    }, [cameraActionCurrent])

    useEffect(() => {
      if (mixer && actions && mountAnimation) {
        mixer.timeScale = 1.2
        mixer.stopAllAction()
        handleAnimations(mountAnimation)
      }
    }, [mixer, actions, mountAnimation])

    const handleAnimations = (mountAnimation) => {
      const currentAnimationName = `CameraAction${mountAnimation}`
      console.log("mountAnimation", mountAnimation)
      if (actions && !isAnimationPlayingRef.current && mountAnimation) {
        const currentAnimation = actions[currentAnimationName]
        mixer.stopAllAction()
        currentAnimation.reset()
        currentAnimation.timeScale = 1
        currentAnimation.setDuration(currentAnimation._clip.duration)
        currentAnimation.clampWhenFinished = true
        currentAnimation.loop = THREE.LoopOnce
        currentAnimation.play()
        setLocalIsAnimationPlaying(currentAnimation.isRunning())
        console.log(
          '🚀 ~ file: usePlayAnimations.jsx:58 ~ handleAnimations ~ currentAnimation.isRunning():',
          currentAnimation.isRunning(),
        )
        setIsAnimationPlaying(currentAnimation.isRunning())

        mixer.addEventListener('finished', onAnimationFinished)
      }
    }

    const onAnimationFinished = () => {
      console.log("🚀 ~ file: usePlayAnimations.jsx:75 ~ onAnimationFinished ~ cameraActionRef.current:", cameraActionRef.current)
      if (cameraActionRef.current) {
        console.log('INANIMATIONFINISHED')
        setLocalIsAnimationPlaying(false)
        setIsAnimationPlaying(localIsAnimationPlaying)
        setFinalPosition(cameraActionRef.current.position.clone())
        setFinalRotation(cameraActionRef.current.rotation.clone())

        mixer.removeEventListener('finished', onAnimationFinished)
      }
    }
  }

  export default usePlayAnimations
