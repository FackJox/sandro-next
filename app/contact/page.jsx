'use client'

import dynamic from 'next/dynamic'

const Contact = dynamic(
  () => import('@/components/dom/Contact').then((mod) => mod.Contact),
  {
    ssr: true,
  },
)

export default function Page() {


  return (
    <div className='flex w-screen h-screen overflow-hidden text-icewhite bg-transparent z-40'>
      <Contact />
    </div>
  )
}
