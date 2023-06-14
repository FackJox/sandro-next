import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../store'
import { debounce } from 'lodash'
import { useSwipeable } from 'react-swipeable'

const useNavigation = (ref, nextRoute) => {
  const router = useRouter()

  const isAnimationPlayingRef = useRef(useStore.getState().isAnimationPlaying)

  useEffect(() => {
    const unsubscribe = useStore.subscribe(
      (newState) => {
        isAnimationPlayingRef.current = newState.isAnimationPlaying
      },
      (state) => state.isAnimationPlaying !== isAnimationPlayingRef.current,
    )
    return () => unsubscribe()
  }, [])

  const handleWheel = useCallback(
    debounce(
      () => {
        if (!isAnimationPlayingRef.current) {
          router.push(nextRoute)
        }
      },
      500,
      { leading: true, trailing: false },
    ),
    [router, isAnimationPlayingRef],
  )

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      if (!isAnimationPlayingRef.current) {
        router.push(nextRoute)
      }
    },
    onSwipedDown: () => {
      if (!isAnimationPlayingRef.current) {
        router.push(nextRoute)
      }
    },
    delta: 10,
    trackTouch: true,
    trackMouse: false,
    rotationAngle: 0,
  })

  useEffect(() => {
    let refVar = ref.current
    ref.current.addEventListener('wheel', handleWheel)
    Object.keys(swipeHandlers).forEach((eventName) => ref.current.addEventListener(eventName, swipeHandlers[eventName]))
    return () => {
      refVar.removeEventListener('wheel', handleWheel)
      Object.keys(swipeHandlers).forEach((eventName) => refVar.removeEventListener(eventName, swipeHandlers[eventName]))
    }
  }, [handleWheel, swipeHandlers])
}
export default useNavigation
