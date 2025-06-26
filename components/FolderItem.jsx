'use client'
import Link from 'next/link'

export default function FolderItem({ id, name }) {
    return (
        <Link
        href={`/dashboard/${id}`}
        className="block p-4 bg-yellow-100 rounded shadow hover:bg-yellow-200 transition"
        >
        <p className="font-medium">📁 {name}</p>
        </Link>
    )
}
