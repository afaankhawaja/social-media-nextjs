'use client'

import Link from 'next/link'
import { HomeIcon, UserIcon, NewspaperIcon } from '@heroicons/react/24/outline'
import { Button } from "@/components/ui/button"
import { useSession } from 'next-auth/react'

interface BottomNavbarProps {
  className?: string
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ className }) => {
  const { data: session, status } = useSession()

  return (
    <nav className={`flex justify-around items-center py-2 ${className}`}>
      <Link href="/" passHref>
        <Button variant="ghost" size="sm" className="flex flex-col items-center">
          <HomeIcon className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </Button>
      </Link>
      <Link href="/profile" passHref>
        <Button variant="ghost" size="sm" className="flex flex-col items-center">
          <UserIcon className="w-5 h-5" />
          <span className="text-xs">
            {status === 'authenticated' && session ? session.user?.email?.split('@')[0] : 'Profile'}
          </span>
        </Button>
      </Link>
      <Link href="/news" passHref>
        <Button variant="ghost" size="sm" className="flex flex-col items-center">
          <NewspaperIcon className="w-5 h-5" />
          <span className="text-xs">News</span>
        </Button>
      </Link>
    </nav>
  )
}

export default BottomNavbar