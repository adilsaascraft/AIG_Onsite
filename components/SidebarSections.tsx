import {
  Users,
  LucideIcon,
  FileText,
  LayoutDashboard,
} from 'lucide-react'

interface SideTab {
  name: string
  icon: LucideIcon
  baseUrl: string
  subtabs: { name: string; icon: LucideIcon }[]
}

const sideTabs: SideTab[] = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    baseUrl: 'dashboard',
    subtabs: [],
  },
  {
    name: 'Badge Printing',
    icon: Users,
    baseUrl: 'badge-printing',
    subtabs: [
      { name: 'Summary', icon: FileText },
      { name: 'Print Badges', icon: Users },
      { name: 'Qr Setting', icon: Users },
    ],
  },
  {
    name: 'Accomodation',
    icon: Users,
    baseUrl: 'accomodation',
    subtabs: [
      { name: 'Summary', icon: FileText },
      { name: 'Add Accomodations', icon: FileText },
      { name: 'Transfered Accomodations', icon: FileText },
      { name: 'Allotted Hotels', icon: FileText },
    ],
  },
  {
    name: 'Travel',
    icon: Users,
    baseUrl: 'travel',
    subtabs: [
      { name: 'Summary', icon: FileText },
      { name: 'All Travels', icon: FileText },
      { name: 'Transfered Travels', icon: FileText },
      { name: 'Travel Desk Support', icon: FileText },
    ],
  },
]

export default sideTabs
