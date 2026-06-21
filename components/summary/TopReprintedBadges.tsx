'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Badge } from '@/components/ui/badge'

import { Trophy, Printer } from 'lucide-react'

interface TopReprintItem {
  id: string
  name: string
  regNum: string
  badgeProfileName: string
  printCount: number
}

interface Props {
  items: TopReprintItem[]
}

export default function TopReprintedBadges({ items }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          Top Reprinted Badges
        </CardTitle>
      </CardHeader>

      <CardContent>
        {items.length === 0 ? (
          <div className="py-10 text-center text-muted-foreground">
            No reprinted badges found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>

                  <TableHead>Reg No</TableHead>

                  <TableHead>Badge Profile</TableHead>

                  <TableHead className="text-right">Print Count</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>

                    <TableCell>{item.regNum}</TableCell>

                    <TableCell>
                      <Badge variant="secondary">{item.badgeProfileName}</Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <Badge>
                        <Printer className="mr-1 h-3 w-3" />

                        {item.printCount}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
