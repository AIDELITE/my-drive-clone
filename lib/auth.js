// lib/auth.js
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from './db'
import bcrypt from 'bcryptjs'

export const authOptions = {
    providers: [
        CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
        const user = await db.user.findUnique({
            where: { email: credentials.email }
        })

        if (!user) {
            throw new Error('Invalid credentials')
        }

        const isValid = await bcrypt.compare(credentials.password, user.password)
        if (!isValid) {
            throw new Error('Invalid credentials')
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name || null
        }
        }
        }),
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async session({ session, token, user }) {
        const dbUser = await db.user.findUnique({ where: { email: session.user.email } })
        session.user.id = dbUser.id
        return session
        },
    },
    session: { strategy: 'jwt' }
}
