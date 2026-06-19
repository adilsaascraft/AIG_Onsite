'use client'

import Sidebar from '@/components/Sidebar'
import MobileNavbar from '@/components/MobileNavbar'
import Header from '@/components/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* =========================================
       * TOP NAVBAR
       * ========================================= */}

      <div className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#0A0E80] via-[#0E3C96] to-[#75a8f2] shadow-md dark:from-[#1a1a1a] dark:via-[#222] dark:to-[#444]">
        <Header />
      </div>

      {/* =========================================
       * MOBILE NAVBAR
       * ========================================= */}

      <div className="sticky top-[56px] z-40 block lg:hidden">
        <MobileNavbar />
      </div>

      {/* =========================================
       * MAIN LAYOUT
       * ========================================= */}

      <div className="flex">
        {/* =========================================
         * FIXED SIDEBAR
         * ========================================= */}

        <aside
          className="fixed left-0 top-14 z-30 hidden border-r bg-background lg:block"
          style={{
            width: 280,
            height: 'calc(100vh - 56px)',
          }}
        >
          <Sidebar />
        </aside>

        {/* =========================================
         * PAGE CONTENT
         * ========================================= */}

        <main className="min-w-0 flex-1 overflow-x-hidden lg:ml-[280px]">
          <div>{children}</div>
        </main>
      </div>
    </div>
  )
}
