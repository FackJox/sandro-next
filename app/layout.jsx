import dynamic from 'next/dynamic'

import { Layout } from '@/components/dom/Layout'
import '@/global.css'

const Navbar = dynamic(() => import('@/components/dom/Navbar').then((mod) => mod.Navbar), {
  ssr: false,
})

export const metadata = {
  title: 'sandro gh | Filmmaker',
  description: 'High Altitudes & Hostile Environments',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Navbar />
        <Layout>
          {children}
          </Layout>
      </body>
    </html>
  )
}
