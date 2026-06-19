'use client'

import Link from 'next/link'

import { useEffect, useMemo, useState } from 'react'

import { useParams, usePathname } from 'next/navigation'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Input } from '@/components/ui/input'

import { Search } from 'lucide-react'

import { cn } from '@/lib/utils'

import sideTabs from '@/components/SidebarSections'

export default function Sidebar() {
  const pathname = usePathname()

  const params = useParams<{
    eventId: string
  }>()

  const eventId = params?.eventId

  const [search, setSearch] = useState('')

  const [expandedAccordion, setExpandedAccordion] = useState('')

  /* =========================================
   * CURRENT ROUTE
   * ========================================= */

  const pathParts = pathname.split('/')

  const currentBaseRoute = pathParts[2] || ''
  const currentSubRoute = pathParts[3] || ''

  /* =========================================
   * SEARCH FILTERING
   * ========================================= */

  const filteredTabs = useMemo(() => {
    if (!search.trim()) {
      return sideTabs
    }

    return sideTabs
      .map((tab) => {
        const matchedMainTab = tab.name
          .toLowerCase()
          .includes(search.toLowerCase())

        const matchedSubtabs = tab.subtabs.filter((subtab) =>
          subtab.name.toLowerCase().includes(search.toLowerCase()),
        )

        // Show full accordion if main matched
        if (matchedMainTab) {
          return tab
        }

        // Show only matching subtabs
        return {
          ...tab,
          subtabs: matchedSubtabs,
        }
      })
      .filter(
        (tab) =>
          tab.name.toLowerCase().includes(search.toLowerCase()) ||
          tab.subtabs.length > 0,
      )
  }, [search])

  /* =========================================
   * SIMPLE / ACCORDION TABS
   * ========================================= */

  const simpleTabs = filteredTabs.filter((tab) => tab.subtabs.length === 0)

  const accordionTabs = filteredTabs.filter((tab) => tab.subtabs.length > 0)

  /* =========================================
   * AUTO EXPAND SEARCH
   * ========================================= */

  useEffect(() => {
    if (!search.trim()) {
      setExpandedAccordion('')
      return
    }

    const matchedAccordion = accordionTabs.find((tab) => {
      const mainMatched = tab.name.toLowerCase().includes(search.toLowerCase())

      const subMatched = tab.subtabs.some((sub) =>
        sub.name.toLowerCase().includes(search.toLowerCase()),
      )

      return mainMatched || subMatched
    })

    if (matchedAccordion) {
      setExpandedAccordion(matchedAccordion.name)
    }
  }, [search, accordionTabs])

  /* =========================================
   * UI
   * ========================================= */

  return (
    <aside className="w-[280px] bg-gray-50/50 h-full overflow-y-auto custom-scrollbar border-r">
      <div className="p-4">
        {/* =========================================
         * HEADING
         * ========================================= */}

        <h2 className="mb-4 text-lg font-semibold text-sky-900">
          Onsite Panel
        </h2>

        {/* =========================================
         * SEARCH
         * ========================================= */}

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search menu..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 bg-white pl-9"
          />
        </div>

        {/* =========================================
         * SIMPLE TABS
         * ========================================= */}

        <div className="mb-3 space-y-2">
          {simpleTabs.map((tab) => {
            const href = tab.baseUrl
              ? `/${eventId}/${tab.baseUrl}`
              : `/${eventId}/dashboard`

            const isActive = currentBaseRoute === tab.baseUrl

            return (
              <Link
                key={tab.name}
                href={href}
                className={cn(
                  'flex items-center gap-3 rounded-xl border bg-white px-4 py-3 transition-all',
                  isActive
                    ? 'border-sky-200 bg-sky-100 text-sky-900'
                    : 'text-gray-700 hover:bg-gray-100',
                )}
              >
                <tab.icon
                  className={cn(
                    'h-5 w-5',
                    isActive ? 'text-sky-700' : 'text-gray-500',
                  )}
                />

                <span className="font-medium">{tab.name}</span>
              </Link>
            )
          })}
        </div>

        {/* =========================================
         * ACCORDION
         * ========================================= */}

        <Accordion
          type="single"
          collapsible
          value={search.trim() ? expandedAccordion : undefined}
          defaultValue={
            !search.trim()
              ? accordionTabs.find((tab) => tab.baseUrl === currentBaseRoute)
                  ?.name
              : undefined
          }
          onValueChange={(value) => {
            if (!search.trim()) {
              setExpandedAccordion(value)
            }
          }}
          className="space-y-2"
        >
          {accordionTabs.map((tab) => (
            <AccordionItem
              key={tab.name}
              value={tab.name}
              className="rounded-xl border bg-white px-2"
            >
              {/* =========================================
               * MAIN TAB
               * ========================================= */}

              <AccordionTrigger className="py-2 hover:no-underline">
                <div
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-2 py-2 transition-all',
                    currentBaseRoute === tab.baseUrl
                      ? 'bg-sky-100 text-sky-900'
                      : 'text-gray-700 hover:bg-gray-100',
                  )}
                >
                  <tab.icon
                    className={cn(
                      'h-5 w-5',
                      currentBaseRoute === tab.baseUrl
                        ? 'text-sky-700'
                        : 'text-gray-500',
                    )}
                  />

                  <span className="font-medium">{tab.name}</span>
                </div>
              </AccordionTrigger>

              {/* =========================================
               * SUB TABS
               * ========================================= */}

              <AccordionContent>
                <div className="ml-6 space-y-1 border-l border-gray-200 pb-2 pl-3">
                  {tab.subtabs.map((subtab) => {
                    const slug = subtab.name.toLowerCase().replace(/\s+/g, '-')

                    const href = `/${eventId}/${tab.baseUrl}/${slug}`

                    const isActive =
                      currentBaseRoute === tab.baseUrl &&
                      currentSubRoute === slug

                    return (
                      <Link
                        key={subtab.name}
                        href={href}
                        className={cn(
                          'group relative flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-all',
                          isActive
                            ? 'bg-sky-50 font-medium text-sky-900'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                        )}
                      >
                        {/* Active Indicator */}

                        <span
                          className={cn(
                            'absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full transition-all',
                            isActive
                              ? 'bg-sky-600 opacity-100'
                              : 'bg-gray-400 opacity-0 group-hover:opacity-40',
                          )}
                        />

                        <subtab.icon className="h-4 w-4" />

                        <span>{subtab.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </aside>
  )
}
