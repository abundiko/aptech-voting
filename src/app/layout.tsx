
import type { Metadata } from 'next'
import './globals.css'
import StateProvider from './(index)/StateProvider'

export const metadata: Metadata = {
  title: 'Aptech Faculty Voting',
  description: 'faculty voting system for aptech. developed by @abundiko',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-primary-dark text-dark min-h-screen overflow-hidden'>
      <StateProvider>
      {children}
      </StateProvider>
    </html>
  )
}
