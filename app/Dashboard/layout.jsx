
// import { getServerSession } from 'next-auth';
// import Header from '@/components/Header';

// import Navbar from '@/components/Navbar';
// import Sidebar from '@/components/Sidebar';

// export default async function DashboardLayout({ children }) {
//     const session = await getServerSession()
//     return (
//         <div className="flex h-screen overflow-hidden">
//         <Header session={session} />
//         <Sidebar />
//         <div className="flex-1 flex flex-col">
//             <Navbar />
//             <main className="p-4 overflow-y-auto bg-gray-50">{children}</main>
//         </div>
//         </div>
//     )
// }
import Header from '@/components/Header'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen overflow-hidden">
        <Header /> {/* Let it use useSession() internally */}
        <Sidebar />
        <div className="flex-1 flex flex-col">
            <Navbar />
            <main className="p-4 overflow-y-auto bg-gray-50">{children}</main>
        </div>
        </div>
    )
}

