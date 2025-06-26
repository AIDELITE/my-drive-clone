'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function AuthForm({ type = 'login' }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const router = useRouter()

    const validateForm = () => {
        if (!email || !password) {
        toast.error('Email and password are required')
        return false
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
        toast.error('Enter a valid email')
        return false
        }

        if (password.length < 6) {
        toast.error('Password must be at least 6 characters')
        return false
        }

        if (type === 'register' && password !== confirmPassword) {
        toast.error('Passwords do not match')
        return false
        }

        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        setSubmitting(true)

        if (type === 'login') {
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        if (res?.error) {
            toast.error('Invalid credentials')
        } else {
            toast.success('Logged in successfully!')
            router.push('/dashboard')
        }
        } else {
        // Register
        try {
            const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (data.success) {
            toast.success('Account created! Redirecting to Dashboard')
            await signIn('credentials', {
                redirect: false,
                email,
                password,
            })
            router.push('/dashboard')
            } else {
            toast.error(data.message || 'Registration failed')
            }
        } catch (err) {
            toast.error('Something went wrong')
        }
        }

        setSubmitting(false)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
        />

        {type === 'register' && (
            <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
            />
        )}

        <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
            {submitting
            ? type === 'login'
                ? 'Logging in...'
                : 'Registering...'
            : type === 'login'
            ? 'Log In'
            : 'Register'}
        </button>
        <div className="text-sm text-center">
            {type === 'login' ? (
                <>
                Don't have an account?{' '}
                <Link href="/register" className="text-blue-600 hover:underline">
                    Register
                </Link>
                </>
            ) : (
                <>
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:underline">
                    Log in
                </Link>
                </>
            )}
            </div>
        </form>
    )
}
