'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { Eye, EyeOff, Fingerprint, Hand, KeyRound, Loader2 } from 'lucide-react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {

  const [loginToken, setLoginToken] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSecretKey, setShowSecretKey] = useState(false)
  const [isRobotChecked, setIsRobotChecked] = useState(false)

  const login = useAuthStore((state) => state.login)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isRobotChecked) {
      toast.error("Please confirm you're not a robot.")
      return
    }

    try {
      setLoading(true)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/onsite/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            loginToken,
          }),
        },
      )

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Login failed')
      }

      login(result.data)

      toast.success(result.message || 'Login successful')

      router.replace(`/${result.data.eventId._id}/dashboard`)
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header> */}
      <Header />

      {/* Main Content with page background */}
      <main
        className="flex-1 flex items-center justify-center p-4"
        style={{ backgroundColor: '#ffffffa6' }}
      >
        <div className="max-w-6xl w-full mx-auto grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
          {/* Left Side - Login Form */}
          <div className="p-8 md:p-10" style={{ backgroundColor: '#d6e9ff' }}>
            <div className="max-w-md mx-auto">
              <div className="mb-1 text-center">
                <div className="flex items-center gap-3 items-center justify-center">
                  <h1 className="text-3xl font-bold text-gray-800">
                    Welcome Back
                  </h1>
                  <Hand className="h-8 w-8 text-amber-500 origin-bottom-right animate-[wave_1.5s_ease-in-out_infinite]" />
                </div>

                <p className="mt-2 text-gray-500">
                  Login to Access Your Dashboard
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="token"
                    className="text-sm font-medium text-gray-700"
                  >
                    Enter Login Secret Key
                  </Label>

                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                    <Input
                      id="token"
                      type={showSecretKey ? 'text' : 'password'}
                      value={loginToken}
                      onChange={(e) =>
                        setLoginToken(e.target.value.toUpperCase())
                      }
                      placeholder="Enter Secret Key"
                      disabled={loading}
                      required
                      className="pl-10 pr-10 h-11 border-gray-200 bg-white"
                    />

                    <button
                      type="button"
                      onClick={() => setShowSecretKey(!showSecretKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showSecretKey ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* reCAPTCHA Area */}
                <div className="border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="robot"
                      checked={isRobotChecked}
                      onCheckedChange={(checked) =>
                        setIsRobotChecked(checked as boolean)
                      }
                      className="w-5 h-5 border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                    />
                    <Label
                      htmlFor="robot"
                      className="text-sm text-gray-700 cursor-pointer flex items-center gap-2"
                    >
                      <Fingerprint className="w-4 h-4" />
                      I'm not a robot
                    </Label>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 pl-8">
                    reCAPTCHA protected
                  </div>
                </div>

                {/* Login Button */}
                <Button
                  type="submit"
                  disabled={loading || !loginToken.trim() || !isRobotChecked}
                  className="w-full h-11 text-base font-semibold bg-sky-800 hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging In...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </form>
            </div>
          </div>

          {/* Right Side - Image */}
          <div
            className="hidden md:block relative bg-cover bg-center"
            style={{ backgroundImage: "url('login.png')" }}
          >
            {/* You can replace with actual image path */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
