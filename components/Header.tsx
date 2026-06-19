'use client'

import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/authStore'
import { formatShortDate } from '@/lib/formatIndianDate'

const getStatusClass = (status?: string) => {
  const map: Record<string, string> = {
    Live: 'bg-green-100 text-green-700 border-green-200',
    Upcoming: 'bg-purple-100 text-purple-700 border-purple-200',
    Past: 'bg-orange-100 text-orange-700 border-orange-200',
  }

  return map[status || ''] || 'bg-gray-100 text-gray-700 border-gray-200'
}

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()

  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  const isLoginPage = pathname === '/'

  const event = user?.eventId

  const formattedStart = event?.startDateTime
    ? formatShortDate(new Date(event.startDateTime))
    : ''

  const formattedEnd = event?.endDateTime
    ? formatShortDate(new Date(event.endDateTime))
    : ''

  const handleLogout = () => {
    logout()

    toast.success('Logged out successfully')

    router.replace('/')
  }

  return (
    <header
      className="
        sticky top-0 z-50
        bg-gradient-to-r
        from-[#0A0E80]
        via-[#0E3C96]
        to-[#75a8f2]
        text-white
        shadow-md
      "
    >
      <div className="h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4 md:gap-6 min-w-0">
          <button type="button" className="shrink-0">
            <Image
              src="/logo.png"
              width={100}
              height={50}
              alt="Logo"
              priority
              className="brightness-0 invert"
            />
          </button>

          {!isLoginPage && event && (
            <div className="hidden md:flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  className="
                    font-bold
                    text-lg
                    text-white
                    max-w-[450px]
                    truncate
                  "
                  title={event.eventName}
                >
                  {event.eventName}
                </h2>

                {event.dynamicStatus && (
                  <span
                    className={`
                      px-3 py-1
                      rounded-full
                      text-xs
                      font-semibold
                      border
                      ${getStatusClass(event.dynamicStatus)}
                    `}
                  >
                    {event.dynamicStatus}
                  </span>
                )}
              </div>

              {(formattedStart || formattedEnd) && (
                <p className="text-sm text-white/90">
                  {formattedStart} - {formattedEnd}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right */}
        {!isLoginPage && user && (
          <Button
            onClick={handleLogout}
            variant="secondary"
            className="
              border border-white
              px-4 py-1
              rounded-lg
              font-semibold
              text-sm
              hover:bg-white
              hover:text-sky-800
              transition
            "
          >
            Logout
          </Button>
        )}
      </div>
    </header>
  )
}
