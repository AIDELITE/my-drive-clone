import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req) {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    const parentId = searchParams.get('parentId') || null

    const folders = await db.folder.findMany({
        where: { userId, parentId },
        orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json(folders)
}
