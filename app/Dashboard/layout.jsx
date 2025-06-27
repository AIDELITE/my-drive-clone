import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }) {
    return (
        <div className="flex flex-col h-screen">
        <Header />

        <div className="flex flex-1 overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {children}
            </main>
            </div>
        </div>
        </div>
    )
}


