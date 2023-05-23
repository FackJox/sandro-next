'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
const PortfolioMenu = dynamic(
  () => import('@/components/dom/portfolio/PortfolioMenu').then((mod) => mod.PortfolioMenu),
  {
    ssr: true,
  },
)

export default function Page() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/portfolio')
  }

  return (
    <div onClick={handleClick}>
      <PortfolioMenu />
    </div>
  )
}
