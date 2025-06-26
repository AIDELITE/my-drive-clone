import { prisma } from '@/lib/db'

export async function POST(req) {
    const body = await req.json()
    const { folderId, newName } = body

    if (!folderId || !newName) {
        return new Response(JSON.stringify({ error: 'Missing folderId or newName' }), { status: 400 })
    }

    const updated = await prisma.folder.update({
        where: { id: folderId },
        data: { name: newName },
    })

    return new Response(JSON.stringify({ success: true, folder: updated }), { status: 200 })
}
