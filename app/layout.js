// // app/layout.jsx
// import '@/styles/globals.css'
// import Sidebar from '@/components/Sidebar'
// import Header from '@/components/Header'
// import { SessionProvider } from 'next-auth/react'

// export const metadata = {
//   title: 'Drive Clone',
//   description: 'Designed as a project by Mwanga Aideed',
// }

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="flex h-screen">
//         <SessionProvider>
//         <Sidebar />
//           <div className="flex-1 flex flex-col">
//             <Header />
//           <main className="p-6 overflow-y-auto bg-gray-50 flex-1">{children}</main>
//         </div>
//         </SessionProvider>
//       </body>
//     </html>
//   )
// }
// app/layout.jsx
import './globals.css'
import Sidebar from '@/components/Sidebar'
import Providers from './providers'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Drive Clone',
  description: 'Designed as a project by Mwanga Aideed',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <Providers><Toaster position="top-right" />{children}</Providers>
      </body>
    </html>
  )
}
