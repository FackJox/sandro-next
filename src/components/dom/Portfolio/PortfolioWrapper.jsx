'use client'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
const PortfolioMenu = dynamic(
  () => import('@/components/dom/portfolio/PortfolioMenu').then((mod) => mod.PortfolioMenu),
  {
    ssr: true,
    loading: () => <p>Loading...</p>,
  },
)
import MotionGallery from '@/components/dom/Portfolio/Motion/MotionGallery'
import MotionPlayer from '@/components/dom/Portfolio/Motion/MotionPlayer'
import StillsGallery from '@/components/dom/Portfolio/Stills/StillsGallery'

export function PortfolioWrapper({ motionData, stillsData }) {
  console.log('🚀 ~ file: PortfolioWrapper.jsx:14 ~ PortfolioWrapper ~ stillsData:', stillsData)
  // console.log("🚀 ~ file: PortfolioWrapper.jsx:14 ~ PortfolioWrapper ~ motionData:", motionData)

  const url = 'https://www.youtube.com/watch?v=3pezSYoVje8'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5 }}
      >
        {/* <PortfolioMenu /> */}
        {/* <MotionGallery motionData={motionData} /> */}

        <MotionPlayer url={url} playing={true} />
        {/* <StillsGallery stillsData={stillsData}/> */}
      </motion.div>
    </AnimatePresence>
  )
}
