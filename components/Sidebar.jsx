import Link from 'next/link'

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r h-full p-4 hidden md:block">
        <nav className="space-y-3">
            <Link href="/dashboard" className="block text-blue-600 font-medium hover:underline">
            📁 My Drive
            </Link>
            <Link href="/upload" className="block text-blue-600 font-medium hover:underline">
            ⬆️ Upload Files
            </Link>
            <Link href="#" className="block text-blue-600 font-medium hover:underline">
            🗑️ Trash
            </Link>
        </nav>
        </aside>
    )
}
