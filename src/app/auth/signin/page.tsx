'use client'

import { signIn } from 'next-auth/react'
import { Button } from "@/components/ui/button"

export default function SignIn() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <Button onClick={() => signIn('google', { callbackUrl: '/' })}>
          Sign in with Google
        </Button>
      </div>
    </div>
  )
}