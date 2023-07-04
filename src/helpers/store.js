import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export const useStore = create(
  devtools(
    // persist(
    (set, get) => ({
      initialized: false,
      setIsInitialized: (value) => set(() => ({ initialized: value })),

      isLoading: true,
      setIsLoading: (value) => set(() => ({ isLoading: value })),

      lastIncrementTime: 0,

      isAnimationPlaying: false,
      setIsAnimationPlaying: (value) => {
        console.log("ANIMATION PLAYING", value)
        set(() => ({ isAnimationPlaying: value }))
      },

      lastPlayedMountAnimation: null,
      setLastPlayedMountAnimation: (animationNumber) => set(() => ({ lastPlayedMountAnimation: animationNumber })),

      // wireMesh: false,
      // setWireMesh: (value) => set(() => ({ wireMesh: value })),

      // sunCycle: 0.0,
      // setSunCycle: (value) => set(() => ({ sunCycle: value })),


    }),
  ),
)