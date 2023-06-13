import { createContext, useContext } from 'react'

const AnimationsContext = createContext()

export const useAnimationsContext = () => {
  return useContext(AnimationsContext)
}

export { AnimationsContext }