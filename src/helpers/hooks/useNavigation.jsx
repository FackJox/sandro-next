import { useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../store'
import { debounce } from 'lodash'

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

  useEffect(() => {
    let refVar = ref.current
    ref.current.addEventListener('wheel', handleWheel)
    return () => refVar.removeEventListener('wheel', handleWheel)
  }, [handleWheel])
}
export default useNavigation
