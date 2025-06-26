'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export default function RenameFileForm({ fileId, currentName, onRename }) {
    const [name, setName] = useState(currentName)
    const [loading, setLoading] = useState(false)

    const handleRename = async (e) => {
        e.preventDefault()
        setLoading(true)

        const res = await fetch('/api/files/rename', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: fileId, name }),
        })

        if (res.ok) {
        toast.success('File renamed!')
        onRename?.()
        } else {
        toast.error('Rename failed')
        }

        setLoading(false);
    }

    return (
        <form onSubmit={handleRename} className="space-x-2">
        <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-1 rounded"
        />
        <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded"
            disabled={loading}
        >
            Rename
        </button>
        </form>
    )
}
