'use client'

import { useState } from 'react'

export default function CreateFolderForm({ userId, parentId = null, onSuccess }) {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
        const res = await fetch('/api/folders/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, userId, parentId })
        })
        if (res.ok) {
            setName('')
            onSuccess?.()
        } else {
            console.error('Failed to create folder')
        }
        } catch (err) {
        console.error(err)
        } finally {
        setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
            type="text"
            placeholder="New folder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1 rounded"
            required
        />
        <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
            {loading ? 'Creating...' : 'Create Folder'}
        </button>
        </form>
    )
}