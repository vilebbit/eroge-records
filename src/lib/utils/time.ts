/**
 * Converts playtime in milliseconds to "h:mm" format
 * @param ms - Total playtime in milliseconds
 * @returns Formatted string in "h:mm" format
 * @example formatPlaytime(7500000) // returns "2:05"
 */
export function formatPlaytime(ms: number): string {
  if (!ms || ms < 0) return "0:00"
  const minutes = Math.floor(ms / 1000 / 60)

  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return `${hours}h ${mins.toString().padStart(2, "0")}m`
}

/**
 * Converts playtime in milliseconds to hours as a decimal number
 * @param ms - Total playtime in milliseconds
 * @returns Hours as decimal
 * @example formatPlaytimeDecimal(1800000) // returns 1.5
 */
export function formatPlaytimeDecimal(ms: number): number {
  const minutes = Math.floor(ms / 1000 / 60)

  if (!minutes || minutes < 0) return 0
  return Math.round((minutes / 60) * 100) / 100
}
