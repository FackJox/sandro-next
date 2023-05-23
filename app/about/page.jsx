import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef, forwardRef } from 'react'





export default function About() {
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  return (
    <>
      <AnimatePresence mode='wait'>
        {!isClicked && <AboutFirst key='aboutfirst' isClicked={isClicked} handleClick={handleClick} />}
        {isClicked && <AboutSecond key='aboutsecond' isClicked={isClicked} handleClick={handleClick} />}
      </AnimatePresence>
    </>
  )
}
