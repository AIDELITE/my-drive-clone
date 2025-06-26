'use client'

import { useState, useRef, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { Menu, X, User } from 'lucide-react'

export default function UserMenu({ email, name }) {
    const [isOpen, setIsOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const dropdownRef = useRef(null)

    const initials = name
        ? name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
        : email?.[0]?.toUpperCase()

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setMenuOpen(false)
        }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative flex flex-col items-end md:items-center space-y-2">
        {/* Mobile Hamburger */}
        <div className="md:hidden">
            <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-black focus:outline-none"
            >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>

        {/* Desktop & mobile user avatar + dropdown */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
            <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full focus:outline-none"
            >
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                {initials}
                </div>
                <span className="hidden md:inline text-gray-700">{email}</span>
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-10">
                <form action="/api/auth/signout" method="POST">
                    <button
                    type="submit"
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                    Logout
                    </button>
                </form>
                </div>
            )}
            </div>
        </div>
        </div>
    )
}
