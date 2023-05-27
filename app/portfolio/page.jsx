'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'

const PortfolioMenu = dynamic(
  () => import('@/components/dom/portfolio/PortfolioMenu').then((mod) => mod.PortfolioMenu),
  {
    ssr: true,
  },
)

export default function Page() {


  return (
<AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2.5 }}
        >
      <PortfolioMenu />
      </motion.div>
  </AnimatePresence>
  )
}
