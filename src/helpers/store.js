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
        const incrementMasterTrigger = get().incrementMasterTrigger
        set(() => ({ isAnimationPlaying: value }))
      },

      // wireMesh: false,
      // setWireMesh: (value) => set(() => ({ wireMesh: value })),

      // sunCycle: 0.0,
      // setSunCycle: (value) => set(() => ({ sunCycle: value })),

      // stillsData: [],
      // motionData: [],
      // setStillsData: (data) => set({ stillsData: data }),
      // setMotionData: (data) => set({ motionData: data }),

      masterTrigger: 1,

      resetIndexTriggersStores: () =>
        set({
          masterTrigger: 2,
          canvasTriggers: {
            animationTriggers: 1,
            textTriggers: 2,
            sunTriggers: 1,
          },
          domTriggers: {
            routeTriggers: 1,
            animationTriggers: 1,
          },
        }),

      setRouteTrigger: (value) => {
        set({ domTriggers: { routeTriggers: value } })
        console.log('route trigger set triggered', get().domTriggers.routeTriggers)
      },

      incrementTextTrigger: () => {
        const currentTime = Date.now()
        const lastIncrementTime = get().lastIncrementTime
        if (currentTime - lastIncrementTime >= 500) {
          set((state) => ({
            ...state,
            canvasTriggers: {
              ...state.canvasTriggers,
              textTriggers: (state.canvasTriggers?.textTriggers || 0) + 1,
            },
            lastIncrementTime: currentTime,
          }))
        }
      },
      incrementMasterTrigger: () => {
        const isAnimationPlaying = get().isAnimationPlaying
        const currentTime = Date.now()
        const lastIncrementTime = get().lastIncrementTime
        if (currentTime - lastIncrementTime >= 500 && !isAnimationPlaying) {
          console.log('increment master trigger triggered')
          set((state) => {
            const trigger = state.masterTrigger + 1
            return {
              masterTrigger: trigger,
              lastIncrementTime: currentTime, // update the last increment time
              canvasTriggers: {
                ...state.canvasTriggers,
                animationTriggers:
                  trigger === 3 || trigger === 5 || trigger === 7 || trigger === 9 || trigger === 10
                    ? (state.canvasTriggers?.animationTriggers || 0) + 1
                    : state.canvasTriggers?.animationTriggers,
                textTriggers:
                  trigger === 1 || trigger === 4 || trigger === 9
                    ? (state.canvasTriggers?.textTriggers || 0) + 1
                    : state.canvasTriggers?.textTriggers,
                sunTriggers:
                  trigger === 1 ? (state.canvasTriggers?.sunTriggers || 0) + 1 : state.canvasTriggers?.sunTriggers,
              },
              domTriggers: {
                ...state.domTriggers,
                routeTriggers:
                  trigger === 4 || trigger === 6 || trigger === 8
                    ? (state.domTriggers.routeTriggers || 0) + 1
                    : state.domTriggers.routeTriggers,
                animationTriggers:
                  trigger === 6 || trigger === 8 || trigger === 10 || trigger === 12 || trigger === 14
                    ? (state.domTriggers.animationTriggers || 0) + 1
                    : state.domTriggers.animationTriggers,
              },
            }
          })
        } else {
        }
      },

      canvasTriggers: {
        animationTriggers: 1,
        textTriggers: 1,
        sunTriggers: 1,
      },
      domTriggers: {
        routeTriggers: 1,
        animationTriggers: 1,
      },
    }),
  ),
)
