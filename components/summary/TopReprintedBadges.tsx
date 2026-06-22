
'use client';

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

// ======================================================
// HEAT COLOR BASED ON PRINT COUNT
// ======================================================
const getHeatColor = (count: number) => {
  if (count >= 10) return 'bg-red-100 text-red-700 border-red-200'
  if (count >= 5) return 'bg-orange-100 text-orange-700 border-orange-200'
  if (count >= 3) return 'bg-amber-100 text-amber-700 border-amber-200'
  return 'bg-sky-100 text-sky-700 border-sky-200'
}

export default function TopReprintedBadges({
  items,
}: Props) {
  return (
    <Card className="p-0 overflow-hidden border-sky-200 shadow-lg shadow-sky-100">
      <CardHeader className="border-b border-sky-100 bg-gradient-to-r from-sky-50 to-white">
        <CardTitle className="p-3 font-bold flex items-center gap-2 text-slate-900">
          <Trophy className="h-5 w-5 text-amber-500" />
          Top Reprinted Badges
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {items.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No reprinted badges found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-sky-50">
                  <TableHead>Name</TableHead>
                  <TableHead>Reg No</TableHead>
                  <TableHead>Badge Profile</TableHead>
                  <TableHead className="text-right">Print Count</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {items.map((item, index) => {
                  const heatClass = getHeatColor(item.printCount)

                  return (
                    <TableRow
                      key={item.id}
                      className="
                        transition-all
                        hover:bg-sky-50/60
                      "
                    >
                      {/* Name (with rank indicator) */}
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-sky-600">
                            #{index + 1}
                          </span>

                          <span>{item.name}</span>
                        </div>
                      </TableCell>

                      <TableCell className="text-slate-600">
                        {item.regNum}
                      </TableCell>

                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="bg-sky-100 text-sky-700"
                        >
                          {item.badgeProfileName}
                        </Badge>
                      </TableCell>

                      {/* Print Count KPI */}
                      <TableCell className="text-right">
                        <div className="flex justify-end">
                          <Badge
                            className={`flex items-center gap-1 border ${heatClass}`}
                          >
                            <Printer className="h-3 w-3" />
                            {item.printCount}
                          </Badge>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
