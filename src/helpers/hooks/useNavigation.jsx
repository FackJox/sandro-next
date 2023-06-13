import { useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "../store"

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

 const handleWheel = useCallback(() => {
   if (!isAnimationPlayingRef.current) {
     router.push(nextRoute)
   }
 }, [router, isAnimationPlayingRef])

 useEffect(() => {
   let refVar = ref.current
   ref.current.addEventListener('wheel', handleWheel)
   return () => refVar.removeEventListener('wheel', handleWheel)
 }, [handleWheel])

}
 export default useNavigation