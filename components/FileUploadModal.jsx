
'use client'

import { useState } from 'react'

export default function FileUploadModal({ userId, folderId = null, onClose, onSuccess }) {
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    const handleUpload = async () => {
        if (!file) return
        setUploading(true)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('userId', userId)
        if (folderId) formData.append('folderId', folderId)

        const res = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
        })

        if (res.ok) {
        onSuccess?.()
        } else {
        console.error('Upload failed')
        }
        setUploading(false)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-lg font-semibold">Upload File</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <div className="flex space-x-2">
            <button
                onClick={handleUpload}
                disabled={uploading || !file}
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
            >
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
            <button
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400"
            >
                Cancel
            </button>
            </div>
        </div>
        </div>
    )
}
