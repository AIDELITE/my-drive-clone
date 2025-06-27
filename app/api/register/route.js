import prisma from '@/lib/db';
import { hash } from 'bcryptjs';

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
        return new Response(JSON.stringify({ error: 'Email and password required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
        return new Response(JSON.stringify({ error: 'Email already in use' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
        }

        const hashedPassword = await hash(password, 10);

        await prisma.user.create({
        data: {
            email,
            password: hashedPassword
        }
        });

        return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        console.error('Registration API Error:', err);
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
