import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const query = searchParams.get('q') || ''
    const userId = searchParams.get('userId')

    if (!userId) return NextResponse.json({ error: 'Missing user ID' }, { status: 400 })

    const [files, folders] = await Promise.all([
        db.file.findMany({
        where: {
            userId,
            name: { contains: query, mode: 'insensitive' } //this wont make it case sensitive
        },
        orderBy: { createdAt: 'desc' }
        }),
        db.folder.findMany({
        where: {
            userId,
            name: { contains: query, mode: 'insensitive' }
        },
        orderBy: { createdAt: 'desc' }
        })
    ])

    return NextResponse.json({ files, folders })
}
