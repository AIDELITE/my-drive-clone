'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Breadcrumbs({ folderNameMap = {} }) {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    // Only show breadcrumbs for /dashboard/folderId/...
    if (!segments.includes('dashboard')) return null

    const crumbs = []
    let currentPath = ''

    for (let i = 1; i < segments.length; i++) {
        currentPath += `/${segments[i]}`
        const isLast = i === segments.length - 1
        const name = folderNameMap[segments[i]] || '...'

        crumbs.push(
        <span key={i} className="flex items-center">
            <span className="mx-1 text-gray-400">/</span>
            {isLast ? (
            <span className="text-gray-700 font-medium">{name}</span>
            ) : (
            <Link href={currentPath} className="text-blue-600 hover:underline">
                {name}
            </Link>
            )}
        </span>
        )
    }

    return (
        <div className="mb-4 text-sm flex items-center flex-wrap">
        <Link href="/dashboard" className="text-blue-600 hover:underline">🏠 My Drive</Link>
        {crumbs}
        </div>
    )
}
