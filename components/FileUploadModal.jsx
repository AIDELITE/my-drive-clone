'use client'

import { useState } from 'react'

export default function FileUploadModal({ isOpen, onClose, folderId }) {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    if (!isOpen) return null

    const handleUpload = async () => {
        if (!file) {
        setError('Please select a file.')
        return
        }

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folderId', folderId || '')

    setLoading(true)
    setError('')

    try {
        const res = await fetch('/api/files/upload', {
            method: 'POST',
            body: formData,
        })

        if (!res.ok) {
            throw new Error('Upload failed')
        }

        onClose() // Close modal after successful upload
        } catch (err) {
        setError(err.message || 'Something went wrong')
        } finally {
        setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-sm space-y-4 shadow-lg">
            <h2 className="text-lg font-bold">Upload File</h2>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm border p-2 rounded"
            />

            <div className="flex justify-between mt-4">
            <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:underline"
                disabled={loading}
            >
                Cancel
            </button>

            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? 'Uploading...' : 'Upload'}
            </button>
            </div>
        </div>
        </div>
    )
}
