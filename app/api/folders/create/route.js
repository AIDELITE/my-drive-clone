import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const body = await req.json()
    const { name, userId, parentId } = body

    const folder = await db.folder.create({
        data: {
        name,
        userId,
        parentId: parentId || null,
        },
    })

    return NextResponse.json(folder)
}

