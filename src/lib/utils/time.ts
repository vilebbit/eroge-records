/**
 * Converts playtime in minutes to "h:mm" format
 * @param minutes - Total playtime in minutes
 * @returns Formatted string in "h:mm" format
 * @example formatPlaytime(125) // returns "2:05"
 */
export function formatPlaytime(minutes: number): string {
  if (!minutes || minutes < 0) return "0:00"
  
  const hours = Math.floor(minutes / 60)
  const mins = Math.floor(minutes % 60)
  
  return `${hours}:${mins.toString().padStart(2, "0")}`
}

/**
 * Converts playtime in minutes to hours as a decimal number
 * @param minutes - Total playtime in minutes
 * @returns Hours as decimal
 * @example formatPlaytimeDecimal(90) // returns 1.5
 */
export function formatPlaytimeDecimal(minutes: number): number {
  if (!minutes || minutes < 0) return 0
  return Math.round((minutes / 60) * 100) / 100
}
