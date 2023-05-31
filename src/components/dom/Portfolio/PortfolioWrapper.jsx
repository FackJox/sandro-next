'use client'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
const PortfolioMenu = dynamic(
  () => import('@/components/dom/portfolio/PortfolioMenu').then((mod) => mod.PortfolioMenu),
  {
    ssr: true,
  },
)
import MotionGallery from '@/components/dom/Portfolio/Gallery/Motion/MotionGallery'
import StillsGallery from '@/components/dom/Portfolio/Gallery/Stills/StillsGallery'

export function PortfolioWrapper({motionData, stillsData}) {
console.log("🚀 ~ file: PortfolioWrapper.jsx:14 ~ PortfolioWrapper ~ stillsData:", stillsData)
// console.log("🚀 ~ file: PortfolioWrapper.jsx:14 ~ PortfolioWrapper ~ motionData:", motionData)

    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5 }}
        >
          {/* <PortfolioMenu /> */}
          <MotionGallery motionData={motionData}/>
          {/* <StillsGallery stillsData={stillsData}/> */}
        </motion.div>
      </AnimatePresence>
    )
}
