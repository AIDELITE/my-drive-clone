import { redirect } from 'next/navigation'

export default function HomePage() {
  redirect('/dashboard') // or /login based on auth
}
