'use client'

import { useSession, signOut } from 'next-auth/react'
import UserMenu from './UserMenu'

export default function Header() {
    const { data: session } = useSession()

    if (!session) return null

    return (
        <header className="w-full bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <a href="/dashboard" className="text-xl font-bold text-blue-600">
            📁 DriveClone
            </a>
            <UserMenu email={session.user.email} name={session.user.name} />
        </div>
        </header>
    )
}

