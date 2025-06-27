'use client'

import { useRouter } from 'next/navigation'

export default function FolderItem({ id, name }) {
    const router = useRouter()

    const openFolder = () => {
        router.push(`/dashboard?folderId=${id}`)
    }

    return (
        <div
        onClick={openFolder}
        className="cursor-pointer bg-white border rounded p-4 hover:shadow transition"
        >
        <p className="font-semibold text-blue-700">📁 {name}</p>
        </div>
    )
}

