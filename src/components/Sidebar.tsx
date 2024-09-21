'use client'

import Link from 'next/link'
import { HomeIcon, UserIcon, BellIcon } from '@heroicons/react/24/outline'
import { Button } from "@/components/ui/button"
import { useSession, signIn, signOut } from 'next-auth/react'

interface SidebarProps {
  className?: string
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const { data: session, status } = useSession()

  return (
    <aside className={`p-4 ${className}`}>
      <nav className="space-y-4">
        <Link href="/" passHref>
          <Button variant="ghost" className="w-full justify-start">
            <HomeIcon className="w-5 h-5 mr-2" />
            Home
          </Button>
        </Link>
        <Link href="/profile" passHref>
          <Button variant="ghost" className="w-full justify-start">
            <UserIcon className="w-5 h-5 mr-2" />
            Profile
          </Button>
        </Link>
        <Link href="/notifications" passHref>
          <Button variant="ghost" className="w-full justify-start">
            <BellIcon className="w-5 h-5 mr-2" />
            Notifications
          </Button>
        </Link>
      </nav>
      {status === 'authenticated' && session ? (
        <div className="mt-4">
          <p className="text-sm mb-2">Signed in as {session.user?.email}</p>
          <Button className="w-full" onClick={() => signOut()}>Logout</Button>
        </div>
      ) : (
        <Button className="w-full mt-4" onClick={() => signIn('google')}>Login with Google</Button>
      )}
    </aside>
  )
}

export default Sidebar