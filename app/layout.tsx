import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import logo from '../docs/assets/images/hale-mark.png'

export const metadata: Metadata = {
  metadataBase: new URL('https://openvitals.health'),
  title: {
    default: 'Hale docs',
    template: '%s - Hale docs'
  },
  description:
    'Documentation for OpenVitals, OpenWatch and OpenBridge, the free, offline health apps for Android published by Hale MTÜ.',
  openGraph: {
<<<<<<< Updated upstream
    title: 'OpenVitals',
    description: 'Local-first Android health dashboard powered by Health Connect.',
    siteName: 'OpenVitals',
    url: 'https://openvitals.health'
=======
    title: 'Hale docs',
    description:
      'Documentation for OpenVitals, OpenWatch and OpenBridge, the free, offline health apps for Android published by Hale MTÜ.',
    siteName: 'Hale',
    url: 'https://docs.hale.ngo'
>>>>>>> Stashed changes
  }
}

const navbar = (
  <Navbar
    logo={
      <span className="openvitals-brand">
        <img src={logo.src} alt="" width="28" height="28" />
        <b>Hale</b>
        <span>docs</span>
      </span>
    }
    projectLink="https://github.com/OpenVitals-MTU/docs"
  />
)

const footer = (
  <Footer>
    <span>
      <a href="https://hale.ngo">Hale MTÜ</a>: OpenVitals, OpenWatch and OpenBridge documentation
    </span>
  </Footer>
)

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head color={{ hue: 175, saturation: 55, lightness: 35 }} />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/OpenVitals-MTU/docs/blob/main/docs"
          editLink="Edit this page"
          feedback={{ link: 'https://github.com/OpenVitals-MTU/docs/issues/new' }}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
