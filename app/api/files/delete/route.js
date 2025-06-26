import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function DELETE(req) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) return NextResponse.json({ error: 'Missing file ID' }, { status: 400 })

    const file = await db.file.delete({ where: { id } })

    return NextResponse.json({ success: true, file })
}
