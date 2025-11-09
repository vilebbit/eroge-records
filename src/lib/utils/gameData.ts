import { PlayStatus, PLAY_STATUS_CONFIG, PlayStatusConfig } from "@/lib/types/common"
import type { GameDoc } from "@/lib/db/documents"

/**
 * Safely extracts cover URL from GameDoc extra metadata
 * @param game - GameDoc object
 * @returns Cover URL string or null if not found
 */
export function getCoverUrl(game: GameDoc): string | null {
  try {
    const coverEntry = game.metadata.extra?.find(
      (entry) => entry.key === "coverUrl"
    )
    
    if (coverEntry && coverEntry.value && coverEntry.value.length > 0) {
      return coverEntry.value[0]
    }
    
    return null
  } catch (error) {
    console.warn(`Failed to extract cover URL for game ${game._id}:`, error)
    return null
  }
}

/**
 * Safely extracts official site URL from GameDoc relatedSites
 * @param game - GameDoc object
 * @returns Official site URL string or null if not found
 */
export function getOfficialSiteUrl(game: GameDoc): string | null {
  try {
    const officialSite = game.metadata.relatedSites?.find(
      (site) => site.label === "official"
    )
    
    if (officialSite && officialSite.url) {
      return officialSite.url
    }
    
    return null
  } catch (error) {
    console.warn(`Failed to extract official site URL for game ${game._id}:`, error)
    return null
  }
}

/**
 * Gets play status configuration (label and color)
 * @param status - Play status string
 * @returns PlayStatusConfig object with label and color
 */
export function getPlayStatusConfig(status: PlayStatus): PlayStatusConfig {
  return PLAY_STATUS_CONFIG[status] || PLAY_STATUS_CONFIG.unplayed
}

/**
 * Validates if a value is a valid PlayStatus
 * @param status - Value to check
 * @returns True if valid PlayStatus
 */
export function isValidPlayStatus(status: string): status is PlayStatus {
  return status in PLAY_STATUS_CONFIG
}

/**
 * Safely gets game title with fallback
 * @param game - GameDoc object
 * @returns Game title or "Untitled Game"
 */
export function getGameTitle(game: GameDoc): string {
  return game.metadata.name || game.metadata.originalName || "Untitled Game"
}

/**
 * Safely gets developers list as comma-separated string
 * @param game - GameDoc object
 * @returns Developers string or "Unknown"
 */
export function getDevelopers(game: GameDoc): string {
  try {
    if (game.metadata.developers && game.metadata.developers.length > 0) {
      return game.metadata.developers.join(", ")
    }
    return "Unknown"
  } catch (error) {
    console.warn(`Failed to extract developers for game ${game._id}:`, error)
    return "Unknown"
  }
}
