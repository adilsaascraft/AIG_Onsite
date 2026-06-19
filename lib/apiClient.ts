// lib/apiClient.ts

const getCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null

  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))

  return match ? decodeURIComponent(match[2]) : null
}

const logoutUser = () => {
  if (typeof window === 'undefined') return

  localStorage.removeItem('onsite-auth')

  document.cookie =
    'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

  window.location.replace('/')
}

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null

  try {
    const auth = localStorage.getItem('onsite-auth')

    const localStorageToken = auth
      ? JSON.parse(auth)?.state?.token ||
        JSON.parse(auth)?.state?.user?.accessToken
      : null

    const cookieToken = getCookie('accessToken')

    const token = localStorageToken || cookieToken

    if (!token) {
      logoutUser()
      return null
    }

    return token
  } catch (error) {
    console.error('Failed to parse auth data', error)

    logoutUser()
    return null
  }
}

type ApiOptions = RequestInit

export async function apiClient<T = any>(
  url: string,
  options: ApiOptions = {},
): Promise<T> {
  const token = getToken()

  const headers = new Headers(options.headers)

  headers.set('Accept', 'application/json')

  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  })

  if (response.status === 401) {
    logoutUser()
    throw new Error('Session expired')
  }

  const data = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`,
    )
  }

  return data
}
