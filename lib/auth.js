import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import prisma from './db'

export const authOptions = {
    providers: [
        CredentialsProvider({
        name: 'Credentials',
        credentials: {
            email: { label: 'Email', type: 'email', placeholder: 'your@email.com' },
            password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
            throw new Error('Email and password required')
            }

            const user = await prisma.user.findUnique({
            where: { email: credentials.email },
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
            name: user.name || null,
            }
        },
        }),
    ],

    pages: {
        signIn: '/login',
    },

    session: {
        strategy: 'jwt',
    },

    callbacks: {
        async jwt({ token, user }) {
        if (user) {
            token.id = user.id
        }
        return token
        },

        async session({ session, token }) {
        if (token?.id) {
            session.user.id = token.id
        }
        return session
        },
    },
}
