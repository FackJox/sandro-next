'use client'

import dynamic from 'next/dynamic'

const PortfolioMenu = dynamic(
  () => import('@/components/dom/portfolio/PortfolioMenu').then((mod) => mod.PortfolioMenu),
  {
    ssr: true,
  },
)

export default function Page() {


  return (

      <PortfolioMenu />

  )
}
