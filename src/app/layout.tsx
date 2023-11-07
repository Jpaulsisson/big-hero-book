import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Super Hero Big Book',
  description: 'Big book of super hero information',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/public/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
