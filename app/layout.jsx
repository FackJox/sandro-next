import dynamic from 'next/dynamic'
import React from 'react'

import { Layout } from '@/components/dom/Layout'
import Navigator  from '@/components/dom/Navigator'
import { Navbar } from '@/components/dom/Navbar'

import '@/global.css'



export const metadata = {
  title: 'sandro gh | High Altitudes & Hostile Environments',
  description: 'High Altitudes & Hostile Environments',
  name: 'viewport',
  content: 'width=device-width; initial-scale=1.0; maximum-scale=1.0; user-scalable=0;',
}

export default function RootLayout({ children }) {
 
  

  return (
    <html lang='en' className='antialiased'>
          {/* <meta name="viewport" content="width=device-width, initial-scale=1"></meta> */}
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
        <Navigator />
      </body>
    </html>
  )
}
