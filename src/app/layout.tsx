'use client'
import './globals.css'
import Providers from './provider'

export const client: any = {
  title: 'User Management App',
  description: 'A Next.js application for managing users with authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
