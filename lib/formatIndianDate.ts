export const formatExcelDate = (date?: string) => {
  if (!date) return ''

  const d = new Date(date)

  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(d)

  const get = (type: string) => parts.find((p) => p.type === type)?.value || ''

  return `${get('year')}-${get('month')}-${get('day')} ${get('hour')}:${get('minute')}:${get('second')}`
}

// lib/formatIndianDate.ts
export const getIndianFormattedDate = (date: Date = new Date()) => {
  return date.toLocaleString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false, // Ensures 24-hour format
    timeZone: 'Asia/Kolkata',
  })
}

export const formatShortDate = (input?: string | Date) => {
  if (!input) return '-'

  const date = input instanceof Date ? input : new Date(input)

  if (isNaN(date.getTime())) return '-'

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateOnly(dateStr: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatEventDates(start: string, end: string) {
  return `${formatDateOnly(start)} - ${formatDateOnly(end)}`
}

// Additional format variations

// 1. Day Month Year (e.g., 05 October 2026)
export const formatDayMonthYear = (date: Date = new Date()) => {
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

// 2. Month Day Year (e.g., October 05, 2026)
export const formatMonthDayYear = (date: Date = new Date()) => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })
}

// 3. Year Month Day (e.g., 2026 October 05)
export const formatYearMonthDay = (date: Date = new Date()) => {
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
}

// 4. Short Day Month Year (e.g., 05 Oct 2026)
export const formatShortDayMonthYear = (date: Date = new Date()) => {
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

// 5. Month Year only (e.g., October 2026)
export const formatMonthYear = (date: Date = new Date()) => {
  return date.toLocaleDateString('en-IN', {
    month: 'long',
    year: 'numeric',
  })
}

// 6. Numeric format DD/MM/YYYY (Indian style)
export const formatNumericIndian = (date: Date = new Date()) => {
  return date.toLocaleDateString('en-IN')
}

// 7. Numeric format MM/DD/YYYY (US style)
export const formatNumericUS = (date: Date = new Date()) => {
  return date.toLocaleDateString('en-US')
}

// 8. With weekday (e.g., Monday, 05 October 2026)
export const formatWithWeekday = (date: Date = new Date()) => {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
