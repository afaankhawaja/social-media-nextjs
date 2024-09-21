
import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import NewsColumn from '@/components/NewsColumn'
import BottomNavbar from '@/components/BottomNavbar'
import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Social Media App',
  description: 'A responsive social media application built with Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <Sidebar className="hidden md:block w-64 bg-white" />
            <main className="flex-grow">{children}</main>
            <NewsColumn className="hidden lg:block w-80 bg-white" />
            <BottomNavbar className="md:hidden fixed bottom-0 left-0 right-0 bg-white" />
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}