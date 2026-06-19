'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useParams } from 'next/navigation'

export default function NotFoundPage() {
  const params = useParams()
  const eventId = params?.eventId as string

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center"
    >
      <div className="w-[350px] h-[60vh] relative mb-8">
        <Image
          src="https://res.cloudinary.com/dymanaa1j/image/upload/v1757228277/not-found-image_uxn2ig.png"
          alt="404 Not Found"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-fit"
          priority
        />
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>

      <p className="text-gray-600 max-w-md mb-6">
        Oops! The page you are looking for does not exist or has been moved.
      </p>

      <Link href={eventId ? `/${eventId}/dashboard` : '/'}>
        <Button variant="secondary">← Go back to Home Page</Button>
      </Link>
    </motion.div>
  )
}
