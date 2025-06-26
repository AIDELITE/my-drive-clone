'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import toast from 'react-hot-toast'

export default function DropZone({ folderId, userId, onUpload }) {
    const onDrop = useCallback(async (acceptedFiles) => {
        const uploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('userId', userId)
        if (folderId) formData.append('folderId', folderId)

        const res = await fetch('/api/files/upload', {
            method: 'POST',
            body: formData,
        })

        if (!res.ok) {
            toast.error(`Failed to upload ${file.name}`)
        } else {
            toast.success(`Uploaded ${file.name}`)
            onUpload?.()
        }
        })

        await Promise.all(uploadPromises)
    }, [folderId, userId, onUpload])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
    })

    return (
        <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}`}
        >
        <input {...getInputProps()} />
        <p className="text-gray-500">
            {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop files here, or click to select'}
        </p>
        </div>
    )
}
