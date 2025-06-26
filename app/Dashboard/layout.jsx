// app/dashboard/layout.jsx
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="p-4 overflow-y-auto bg-gray-50">{children}</main>
        </div>
        </div>
    )
}
