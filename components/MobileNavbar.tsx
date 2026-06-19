'use client'

import { useState, useEffect, useMemo, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import sideTabs from '@/components/SidebarSections'
import { ChevronDown, X } from 'lucide-react'

export default function MobileNavbar() {
  const pathname = usePathname()
  const params = useParams()
  const eventId = params?.eventId as string
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const navItems = useMemo(() => sideTabs, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleToggle = (item: any) => {
    if (item.subtabs.length === 0) return
    setOpenMenu((prev) => (prev === item.name ? null : item.name))
  }

  return (
    <>
      {/* 🔹 Top  navbar (below DashboardNavbar) */}
      <div
        ref={dropdownRef}
        className="top-[64px] bg-background border-t border-blue-900 z-[30]"
      >
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex items-start justify-start gap-6 px-4 py-3 min-w-max">
            {navItems.map((item) => {
              const Icon = item.icon
              const isOpen = openMenu === item.name

              const isActive =
                isOpen ||
                pathname?.includes(`/${item.baseUrl}`) ||
                item.subtabs.some((sub) =>
                  pathname?.includes(
                    `/${item.baseUrl}/${sub.name
                      .toLowerCase()
                      .replace(/\s+/g, '-')}`,
                  ),
                )

              const dashboardHref = eventId
                ? `/events/${eventId}/${item.baseUrl}`
                : '#'

              return (
                <div
                  key={item.name}
                  className="relative flex flex-col items-center"
                >
                  {/* 🔸 Icon button */}
                  <div
                    className="flex flex-col items-center cursor-pointer select-none"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggle(item)
                    }}
                  >
                    {item.subtabs.length === 0 ? (
                      <Link href={dashboardHref}>
                        <button
                          className={cn(
                            'flex flex-col items-center justify-center w-14 h-14 rounded-full border transition-all duration-200',
                            isActive
                              ? 'bg-sky-800 text-white border-sky-800'
                              : 'bg-sky-100 text-sky-800 border-sky-200',
                          )}
                        >
                          <Icon size={22} />
                        </button>
                      </Link>
                    ) : (
                      <button
                        className={cn(
                          'flex flex-col items-center justify-center w-14 h-14 rounded-full border transition-all duration-200',
                          isActive
                            ? 'bg-sky-800 text-white border-sky-800'
                            : 'bg-sky-100 text-sky-800 border-sky-200',
                        )}
                      >
                        <Icon size={22} />
                      </button>
                    )}

                    {/* 🔹 Label + Dropdown Icon */}
                    <div
                      className={cn(
                        'mt-1 flex items-center text-xs font-medium',
                        isActive ? 'text-sky-800' : 'text-gray-700',
                      )}
                    >
                      {item.name}
                      {item.subtabs.length > 0 && (
                        <ChevronDown
                          size={12}
                          className={cn(
                            'ml-1 transition-transform',
                            isOpen ? 'rotate-180' : 'rotate-0',
                          )}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 🔹 Bottom drawer submenu */}
      <AnimatePresence>
        {openMenu &&
          (navItems.find((i) => i.name === openMenu)?.subtabs?.length ?? 0) >
            0 && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-2xl border-t border-gray-200 z-[1000]"
            >
              <div className="flex justify-between items-center px-5 py-3 border-b border-gray-100">
                <span className="font-semibold text-gray-800">{openMenu}</span>
                <button
                  onClick={() => setOpenMenu(null)}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <ul className="flex flex-col divide-y divide-gray-100">
                {navItems
                  .find((i) => i.name === openMenu)
                  ?.subtabs.map((sub) => {
                    const SubIcon = sub.icon
                    const parent = navItems.find((i) => i.name === openMenu)
                    const subPath = eventId
                      ? `/events/${eventId}/${parent?.baseUrl}/${sub.name
                          .toLowerCase()
                          .replace(/\s+/g, '-')}`
                      : '#'
                    const isSubActive = pathname?.includes(subPath)
                    return (
                      <li key={sub.name}>
                        <Link
                          href={subPath}
                          className={cn(
                            'flex items-center gap-3 px-5 py-3 text-sm transition hover:bg-sky-50',
                            isSubActive
                              ? 'text-sky-800 font-medium'
                              : 'text-gray-700',
                          )}
                          onClick={() => setOpenMenu(null)}
                        >
                          <SubIcon size={16} />
                          {sub.name}
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            </motion.div>
          )}
      </AnimatePresence>
    </>
  )
}
