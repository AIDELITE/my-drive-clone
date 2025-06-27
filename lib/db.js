import { PrismaClient } from '@prisma/client'
    let prisma
    if (typeof window === 'undefined') {
    if (!globalThis.prisma) {
        globalThis.prisma = new PrismaClient()
    }
    prisma = globalThis.prisma
    } else {
    throw new Error('PrismaClient should not be used in the browser')
    }

export default prisma
