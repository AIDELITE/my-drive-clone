'use client'
import { useState } from 'react'

export default function CreateFolderForm({ parentId = null, userId, onSuccess }) {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await fetch('/api/folders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, userId, parentId }),
        })
        if (res.ok) {
        setName('')
        onSuccess && onSuccess()
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-x-2 mt-4">
        <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-3 py-1 rounded"
            placeholder="New Folder"
        />
        <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-1 rounded"
            disabled={loading}
        >
            {loading ? 'Creating...' : 'Create'}
        </button>
        </form>
    )
}
