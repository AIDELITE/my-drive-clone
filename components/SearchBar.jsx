'use client'

import { useState, useEffect } from 'react'
import { useDebounce } from '@/lib/hooks'

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('')
    const debouncedQuery = useDebounce(query, 300)

    useEffect(() => {
        onSearch(debouncedQuery)
    }, [debouncedQuery])

    return (
        <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search files or folders..."
        className="w-full md:w-1/2 px-4 py-2 border rounded"
        />
    )
}
