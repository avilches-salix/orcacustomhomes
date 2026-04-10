import React from 'react'

import config from '@payload-config'
import { getPayload } from 'payload'

import { Navbar } from '@/components/Navbar/Navbar'

import './styles.css'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const payload = await getPayload({ config })
  const header = await payload.findGlobal({ slug: 'header' })

  return (
    <html lang="en">
      <body>
        <Navbar header={header} />
        <main>{children}</main>
      </body>
    </html>
  )
}
