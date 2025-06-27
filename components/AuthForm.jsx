'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthForm({ type = 'login' }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (type === 'register') {
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        const res = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (!res.ok) {
            setError(data?.error || 'Registration failed')
        } else {
            setSuccess('Registration successful! You can now log in.')
            setEmail('')
            setPassword('')
            setConfirmPassword('')
        }
        } else {
        const res = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        if (res?.error) setError('Invalid credentials')
        else router.push('/dashboard')
        }
    }

    return (
        <div className="max-w-md w-full bg-white p-8 rounded shadow space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">
            {type === 'login' ? 'Login to your account' : 'Create an account'}
        </h2>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        {success && <p className="text-sm text-green-600 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="email"
            placeholder="Email"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            {type === 'register' && (
            <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            )}

            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
            {type === 'login' ? 'Log In' : 'Register'}
            </button>
        </form>

        <div className="text-center text-sm">
            {type === 'login' ? (
            <p>
                Don’t have an account?{' '}
                <a href="/register" className="text-blue-600 hover:underline">
                Register
                </a>
            </p>
            ) : (
            <p>
                Already have an account?{' '}
                <a href="/login" className="text-blue-600 hover:underline">
                Log In
                </a>
            </p>
            )}
        </div>
        </div>
    )
}

