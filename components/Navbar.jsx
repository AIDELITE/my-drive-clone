
'use client'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
    const { data: session } = useSession()

    return (
        <header className="w-full bg-white border-b shadow px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800">📁 Drive Clone</h1>
        {session?.user && (
            <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{session.user.email}</span>
            <button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
            >
                Logout
            </button>
            </div>
        )}
        </header>
    )
}
