import React from 'react'

import config from '@payload-config'
import { getPayload } from 'payload'

import { Footer } from '@/components/Footer/Footer'
import { Navbar } from '@/components/Navbar/Navbar'

import './styles.css'

export const metadata = {
  description: 'At Orca Custom Homes, we develop and build high-quality homes throughout Bellevue and the Eastside.',
  title: 'Orca Custom Homes',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })
  const header = await payload.findGlobal({ slug: 'header' })
  const footer = await payload.findGlobal({ slug: 'footer' })

  return (
    <html lang="en">
      <body>
        <Navbar header={header} />
        <main>{children}</main>
        <Footer footer={footer} />
      </body>
    </html>
  )
}
