export default function Navbar() {
    return (
        <header className="w-full bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-700">📁 Drive Clone</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm">
            Logout
        </button>
        </header>
    )
}