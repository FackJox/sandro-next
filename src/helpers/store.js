import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

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

      sunCycle: 0.0,
      setSunCycle: (value) => set(() => ({ sunCycle: value })),

      masterTrigger: 1,
      resetIndexTriggersStores: () =>
        set({
          masterTrigger: 3,
          canvasTriggers: {
            animationTriggers: 1,
            textTriggers: 2,
            sunTriggers: 1,
          },
          domTriggers: {
            routeTriggers: 1,
          },
        }),
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
          set((state) => {
            const trigger = state.masterTrigger + 1
            return {
              masterTrigger: trigger,
              lastIncrementTime: currentTime, // update the last increment time
              canvasTriggers: {
                ...state.canvasTriggers,
                animationTriggers:
                  trigger === 4 || trigger === 6 || trigger === 8 || trigger === 10 || trigger === 11
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
                  trigger === 5 || trigger === 7 || trigger === 9 || trigger === 11 || trigger === 13
                    ? (state.domTriggers.routeTriggers || 0) + 1
                    : state.domTriggers.routeTriggers,
                domTrigger2:
                  trigger === 5 || trigger === 6 || trigger === 7 || trigger === 8 || trigger === 9
                    ? (state.domTriggers.domTrigger2 || 0) + 1
                    : state.domTriggers.domTrigger2,
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
      },
    }),
  ),
)