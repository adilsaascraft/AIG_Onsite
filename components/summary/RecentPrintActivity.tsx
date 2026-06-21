'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'

import { Clock3, Printer, User } from 'lucide-react'

interface RecentPrintItem {
  id: string
  name: string
  regNum: string
  badgeProfileName: string
  printedAt: string
  printCount: number
}

interface Props {
  items: RecentPrintItem[]
}

export default function RecentPrintActivity({ items }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Printer className="h-5 w-5" />
          Recent Print Activity
        </CardTitle>
      </CardHeader>

      <CardContent>
        {items.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground">
            No badge printing activity found
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />

                    <span className="font-semibold">{item.name}</span>

                    <Badge variant="secondary">{item.badgeProfileName}</Badge>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {item.regNum}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Badge>{item.printCount} Prints</Badge>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock3 className="h-4 w-4" />

                    {new Date(item.printedAt).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
