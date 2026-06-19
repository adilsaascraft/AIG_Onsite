import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface EventData {
  _id: string
  eventName: string
  startDateTime: string
  endDateTime: string
  dynamicStatus: string
}

interface UserData {
  _id: string
  name: string
  loginToken: string
  status: string
  accessToken: string
  eventId: EventData
}

interface AuthState {
  token: string | null
  user: UserData | null

  login: (data: UserData) => void
  logout: () => void
  validateSession: () => void
}

const getCookie = (name: string) => {
  if (typeof document === 'undefined') return null

  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`))

  return value?.split('=')[1] || null
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,

      login: (data) => {
        const maxAge = 60 * 60 * 24 * 7 // 7 days

        document.cookie = `accessToken=${data.accessToken}; max-age=${maxAge}; path=/; SameSite=Lax`

        document.cookie = `eventId=${data.eventId._id}; max-age=${maxAge}; path=/; SameSite=Lax`

        set({
          token: data.accessToken,
          user: data,
        })
      },

      logout: () => {
        document.cookie =
          'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'

        document.cookie =
          'eventId=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'

        localStorage.removeItem('onsite-auth')

        set({
          token: null,
          user: null,
        })
      },

      validateSession: () => {
        const accessToken = getCookie('accessToken')
        const eventId = getCookie('eventId')

        if (!accessToken || !eventId) {
          localStorage.removeItem('onsite-auth')

          set({
            token: null,
            user: null,
          })
        }
      },
    }),
    {
      name: 'onsite-auth',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    },
  ),
)
