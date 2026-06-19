export const CATEGORY_COLORS = [
  { header: 'bg-red-200', row: 'bg-red-50' },
  { header: 'bg-blue-200', row: 'bg-blue-50' },
  { header: 'bg-green-200', row: 'bg-green-50' },
  { header: 'bg-yellow-200', row: 'bg-yellow-50' },
  { header: 'bg-purple-200', row: 'bg-purple-50' },
  { header: 'bg-pink-200', row: 'bg-pink-50' },
  { header: 'bg-indigo-200', row: 'bg-indigo-50' },
  { header: 'bg-orange-200', row: 'bg-orange-50' },
  { header: 'bg-teal-200', row: 'bg-teal-50' },
  { header: 'bg-gray-300', row: 'bg-gray-100' },
]

// categoryColors.js

export const categoryColors = [
  '#60A5FA', // blue
  '#34D399', // green
  '#F87171', // red
  '#A78BFA', // violet
  '#FB7185', // rose
  '#F97316', // orange
  '#6366F1', // indigo
  '#84CC16', // lime
  '#94A3B8', // slate
  '#2DD4BF', // teal
  '#EAB308', // yellow
  '#EC4899', // pink
  '#22C55E', // emerald
  '#8B5CF6', // purple
  '#0EA5E9', // sky
  '#F43F5E', // deep rose
]

// Same ID will always return same color
export const getCategoryColor = (id = '') => {
  let hash = 0

  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  }

  return categoryColors[Math.abs(hash) % categoryColors.length]
}
