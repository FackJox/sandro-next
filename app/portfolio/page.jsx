'use client'

import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import StillsGallery from '@/components/dom/Portfolio/Gallery/StillsGallery'
import { search, mapImageResources, getFolders } from '@/helpers/cloudinary'

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
      {/* <PortfolioMenu /> */}
      <StillsGallery />
      </motion.div>
  </AnimatePresence>
  )
}

export async function getStaticProps() {
  const results = await search({
    expression: 'folder=""',
  })

  const { resources, next_cursor: nextCursor, total_count: totalCount } = results

  const images = mapImageResources(resources)

  const { folders } = await getFolders()

  return {
    props: {
      title: 'Portfolio',
      images,
      nextCursor: nextCursor || false,
      totalCount,
      folders,
      colourScheme: {
        logo: true,
        connect: true,
      },
    },
  }
}
