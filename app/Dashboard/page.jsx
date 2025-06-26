'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import FileItem from '@/components/FileItem'

export default function DashboardPage() {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true)

    const { data: session, status } = useSession();
    const userId = session?.user?.id;

    if (status === 'loading') return <p>Loading...</p>
    if (!session) return <p>Please log in</p>

    useEffect(() => {
        const fetchFiles = async () => {
        try {
            const res = await fetch(`/api/files?userId=${userId}`)
            const data = await res.json()
            if (Array.isArray(data)) setFiles(data)
        } catch (error) {
            console.error('Failed to fetch files:', error)
        } finally {
            setLoading(false)
        }
        }

        fetchFiles()
    }, [])

    return (
        <div>
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">My Drive</h1>
            <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">📁 My Drive</h1>
                <button
                onClick={() => setShowUpload(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                Upload File
                </button>
            </div>

            <CreateFolderForm userId={userId} onSuccess={fetchDataAgain} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {folders.map((folder) => (
                <FolderItem key={folder.id} {...folder} />
                ))}
                {files.map((file) => (
                <FileItem key={file.id} {...file} onDelete={handleDelete} />
                ))}
            </div>
            </div>
        </div>

        {loading ? (
            <p>Loading files...</p>
        ) : files.length === 0 ? (
            <p className="text-gray-500">No files uploaded yet.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {files.map((file) => (
                <FileItem key={file.id} name={file.name} type={file.mimeType} url={file.url} />
            ))}
            </div>
        )}
        </div>
    )
}
