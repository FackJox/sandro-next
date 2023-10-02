import React from "react"
import { Stars } from "@react-three/drei"

export default function NightSky() {

    return (
        <>

            <Stars
                radius={175} // Radius of the inner sphere (default=100)
                depth={50} // Depth of area where stars should fit (default=50)
                count={700} // Amount of stars (default=5000)
                factor={4} // Size factor (default=4)
                saturation={0} // Saturation 0-1 (default=0)
                fade={true} // Faded dots (default=false)
            />
        </>
    )
}