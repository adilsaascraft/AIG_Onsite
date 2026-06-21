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
      { name: 'QR Setting', icon: Users },
    ],
  },
  {
    name: 'Scanning',
    icon: Users,
    baseUrl: 'scanning',
    subtabs: [
      { name: 'Summary', icon: FileText },
      { name: 'Single Scan', icon: FileText },
      { name: 'Multi Scan', icon: FileText },
      
    ],
  },

]

export default sideTabs
