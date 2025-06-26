// app/api/files/route.js

import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const folderId = searchParams.get('folderId') || undefined

    if (!userId) {
        return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    try {
        const files = await db.file.findMany({
        where: {
            userId,
            folderId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        })

        return NextResponse.json(files)
    } catch (err) {
        console.error('Error fetching files:', err)
        return NextResponse.json({ error: 'Failed to fetch files' }, { status: 500 })
    }
}
