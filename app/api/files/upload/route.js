import prisma from '@/lib/db'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export const config = {
    api: {
        bodyParser: false,
    },
    }

    export async function POST(req) {
    const formData = await req.formData()
    const file = formData.get('file')
    const userId = formData.get('userId')
    const folderId = formData.get('folderId') || null

    if (!file || !userId) {
        return new Response(JSON.stringify({ error: 'Missing file or userId' }), { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `${randomUUID()}-${file.name}`
    const filePath = join(process.cwd(), 'public/uploads', filename)

    await writeFile(filePath, buffer)

    const savedFile = await prisma.file.create({
        data: {
        name: file.name,
        url: `/uploads/${filename}`,
        mimeType: file.type,
        size: buffer.length,
        userId,
        folderId,
        }
    })

    return new Response(JSON.stringify(savedFile), { status: 200 })
}