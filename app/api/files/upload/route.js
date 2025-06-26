import { writeFile } from 'fs/promises'
import path from 'path'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import db from '@/lib/db'

export async function POST(req) {
    const formData = await req.formData()
    const file = formData.get('file')
    const folderId = formData.get('folderId') || null
    const userId = formData.get('userId') // TEMP: get from auth later

    if (!file || typeof file === 'string') {
        return NextResponse.json({ error: 'File is required' }, { status: 400 })
    }

    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const ext = path.extname(file.name)
    const filename = `${uuidv4()}${ext}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    const uploadPath = path.join(uploadDir, filename)
    const fileUrl = `/uploads/${filename}`

    try {
        await writeFile(uploadPath, buffer)

        const newFile = await db.file.create({
        data: {
            name: file.name,
            url: fileUrl,
            mimeType: file.type || 'application/octet-stream',
            size: buffer.length,
            userId,
            folderId,
        },
        })

        return NextResponse.json({ success: true, file: newFile })
    } catch (error) {
        console.error('File upload failed:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
