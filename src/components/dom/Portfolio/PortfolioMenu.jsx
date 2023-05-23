import React, { useState } from 'react'

export function PortfolioMenu() {
  const [isHovering, setIsHovering] = useState({ motion: false, stills: false })

  const handleMouseOver = (element) => {
    setIsHovering({ ...isHovering, [element]: true })
  }

  const handleMouseOut = (element) => {
    setIsHovering({ ...isHovering, [element]: false })
  }

  return (
    <div className='flex h-screen flex-col font-BrandonReg '>
      <div className='grid h-full grid-cols-1 align-middle md:grid-cols-2'>
        <div
          className={` flex items-center justify-center align-middle ${
            isHovering.motion ? 'hover-class-left' : ' text-icewhite'
          }`}
        >
          <p
            className={`flex h-28 w-[360px] items-center justify-center text-center align-middle text-7xl lg:w-[420px]  ${
              isHovering.motion ? 'box' : ''
            } `}
            onMouseOver={() => handleMouseOver('motion')}
            onMouseOut={() => handleMouseOut('motion')}
          >
            MOTION
          </p>
        </div>
        <div
          className={` flex items-center justify-center align-middle ${
            isHovering.stills ? 'hover-class-right' : ' text-icewhite'
          }`}
        >
          <p
            className={`text-icewhite flex h-28 w-[360px] items-center justify-center text-center text-7xl lg:w-[420px] ${
              isHovering.stills ? 'box' : ''
            }`}
            onMouseOver={() => handleMouseOver('stills')}
            onMouseOut={() => handleMouseOut('stills')}
          >
            STILLS
          </p>
        </div>
      </div>
    </div>
  )
}
