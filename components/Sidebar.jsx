'use client'
import Link from 'next/link'
import { Folder, UploadCloud, Trash2 } from 'lucide-react'

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r h-full hidden md:flex flex-col p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">Navigation</h2>
        <nav className="space-y-4 text-sm">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Folder className="w-4 h-4" />
            My Drive
            </Link>
            <Link href="/upload" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <UploadCloud className="w-4 h-4" />
            Upload Files
            </Link>
            <Link href="#" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
            <Trash2 className="w-4 h-4" />
            Trash
            </Link>
        </nav>
        </aside>
    )
}
