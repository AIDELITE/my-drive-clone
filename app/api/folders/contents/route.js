import prisma from '@/lib/db'

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')
        const folderId = searchParams.get('folderId')

        if (!userId) {
        return new Response(
            JSON.stringify({ error: 'Missing userId' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        )
        }

        const folders = await prisma.folder.findMany({
        where: {
            userId,
            parentId: folderId || null
        },
        orderBy: { createdAt: 'desc' }
        })

        const files = await prisma.file.findMany({
        where: {
            userId,
            folderId: folderId || null
        },
        orderBy: { createdAt: 'desc' }
        })

        return new Response(
        JSON.stringify({ folders, files }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        console.error('Error fetching folder contents:', error)
        return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
        )
    }
}
