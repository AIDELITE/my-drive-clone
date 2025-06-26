// app/api/files/rename/route.js
import db from '@/lib/db'
import { NextResponse } from 'next/server'

export async function PATCH(req) {
    const { id, name } = await req.json()

    if (!id || !name) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const file = await db.file.update({
        where: { id },
        data: { name },
    })

    return NextResponse.json(file)
}
