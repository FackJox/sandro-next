import { useEffect, useRef, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { debounce } from 'lodash'
import { useSwipeable } from 'react-swipeable'
import usePlayAnimations from './usePlayAnimations'

const useNavigation = (ref, nextRoute) => {
  const router = useRouter()

   const getLocalIsAnimationPlaying = usePlayAnimations()
   const [latestIsAnimationPlaying, setLatestIsAnimationPlaying] = useState(getLocalIsAnimationPlaying())
   
   useEffect(() => {
    //  console.log("🚀 ~ file: useNavigation.jsx:12 ~ useNavigation ~ latestIsAnimationPlaying:", latestIsAnimationPlaying)
     setLatestIsAnimationPlaying(getLocalIsAnimationPlaying())
   }, [getLocalIsAnimationPlaying])


  const handleWheel = useCallback(
    debounce(
      () => {
        if (!latestIsAnimationPlaying) {
          router.push(nextRoute)
        }
      },
      1000,
      { leading: true, trailing: false },
    ),
    [router, latestIsAnimationPlaying],
  )

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      if (!latestIsAnimationPlaying) {
        router.push(nextRoute)
      }
    },
    onSwipedDown: () => {
      if (!latestIsAnimationPlaying) {
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
