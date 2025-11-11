import dayjs from "dayjs"

/**
 * Formats ISO date string to "yyyy-MM-dd" format
 * @param isoDate - ISO 8601 date string
 * @returns Formatted date string in "yyyy-MM-dd" format
 * @example formatDate("2024-01-15T10:30:00.000Z") // returns "2024-01-15"
 */
export function formatDate(isoDate: string): string {
  if (!isoDate) return "N/A"

  try {
    const date = dayjs(isoDate)
    if (!date.isValid()) return "Invalid Date"

    return date.format("YYYY-MM-DD")
  } catch (error) {
    console.error("Error formatting date:", error)
    return "Invalid Date"
  }
}

/**
 * Formats ISO date string to relative time (e.g., "2 days ago")
 * @param isoDate - ISO 8601 date string
 * @returns Relative time string
 */
export function formatRelativeTime(isoDate: string): string {
  if (!isoDate) return "N/A"

  try {
    const date = dayjs(isoDate)
    if (!date.isValid()) return "N/A"

    const now = dayjs()
    const diffDays = now.diff(date, "day")

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
    return `${Math.floor(diffDays / 365)} years ago`
  } catch (error) {
    console.error("Error formatting relative time:", error)
    return "N/A"
  }
}
