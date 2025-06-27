'use client'
import Link from 'next/link' 
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import FileItem from '@/components/FileItem'
import FolderItem from '@/components/FolderItem'
import SearchBar from '@/components/SearchBar'
import CreateFolderForm from '@/components/CreateFolderForm'
import FileUploadModal from '@/components/FileUploadModal'

export default function DashboardPage() {
    const { data: session, status } = useSession()

    const [files, setFiles] = useState([])
    const [folders, setFolders] = useState([])
    const [loading, setLoading] = useState(true)
    const [showUpload, setShowUpload] = useState(false)

    const userId = session?.user?.id

    const fetchDataAgain = async () => {
        try {
        const [filesRes, foldersRes] = await Promise.all([
            fetch(`/api/files?userId=${userId}`),
            fetch(`/api/folders?userId=${userId}`),
        ])

        const filesData = await filesRes.json()
        const foldersData = await foldersRes.json()

        if (Array.isArray(filesData)) setFiles(filesData)
        if (Array.isArray(foldersData)) setFolders(foldersData)
        } catch (error) {
        console.error('Failed to fetch data:', error)
        } finally {
        setLoading(false)
        }
    }

    const handleSearch = async (q) => {
        if (!userId || !q) return
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}&userId=${userId}`)
        const data = await res.json()
        setFiles(data.files || [])
        setFolders(data.folders || [])
    }

    const handleDelete = async (fileId) => {
        await fetch(`/api/files/delete`, {
        method: 'POST',
        body: JSON.stringify({ fileId }),
        })
        fetchDataAgain()
    }

    useEffect(() => {
        if (userId) {
        fetchDataAgain()
        }
    }, [userId])

    if (status === 'loading') return <p className="p-6">Loading session...</p>
    if (!session) {
    return (
        <div className="p-6 text-center space-y-4">
        <p className="text-lg text-gray-700">You are not logged in.</p>
        <Link
            href="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
            Go to Login
        </Link>
        </div>
    )
    }

    return (
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
        <SearchBar onSearch={handleSearch} />

        {loading ? (
            <p>Loading files and folders...</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {folders.map((folder) => (
                <FolderItem key={folder.id} {...folder} />
            ))}
            {files.map((file) => (
                <FileItem key={file.id} {...file} onDelete={handleDelete} />
            ))}
            </div>
        )}

        {showUpload && (
            <FileUploadModal
            userId={userId}
            onClose={() => setShowUpload(false)}
            onSuccess={() => {
                setShowUpload(false)
                fetchDataAgain()
            }}
            />
        )}
        </div>
    )
}
