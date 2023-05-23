'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
const Contact = dynamic(
  () => import('@/components/dom/Contact').then((mod) => mod.Contact),
  {
    ssr: true,
  },
)

export default function Page() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/')
  }

  return (
    <div onClick={handleClick}>
      <Contact />
    </div>
  )
}
