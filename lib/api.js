// Create a new folder
export async function createFolder({ name, userId, parentId = null }) {
    const res = await fetch('/api/folders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, userId, parentId }),
    })
    return res.json()
}

// Upload a file
export async function uploadFile({ file, userId, folderId = null }) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('userId', userId)
    if (folderId) formData.append('folderId', folderId)

    const res = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
    })
    return res.json()
}

// Get folders from inside a parent folder
export async function getFolders({ userId, parentId = null }) {
    const url = new URL('/api/folders', window.location.origin)
    url.searchParams.append('userId', userId)
    if (parentId) url.searchParams.append('parentId', parentId)

    const res = await fetch(url.toString(), { method: 'GET' })
    return res.json()
}

// Get files in a folder
export async function getFiles({ userId, folderId = null }) {
    const url = new URL('/api/files', window.location.origin)
    url.searchParams.append('userId', userId)
    if (folderId) url.searchParams.append('folderId', folderId)

    const res = await fetch(url.toString(), { method: 'GET' })
    return res.json()
}

// Rename a folder
export async function renameFolder({ folderId, newName }) {
    const res = await fetch('/api/folders/rename', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderId, newName }),
    })
    return res.json()
}

// Delete a file
export async function deleteFile(fileId) {
    const res = await fetch('/api/files/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileId }),
    })
    return res.json()
}
