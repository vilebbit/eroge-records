import { PlayStatus, PLAY_STATUS_CONFIG, PlayStatusConfig } from "@/lib/types/common"
import type { GameDoc } from "@/lib/db/documents"

/**
 * Safely extracts URL from GameDoc extra metadata
 * @param game - GameDoc object
 * @param linkType - Link type
 * @returns URL string or null if not found
 */
export function getGameRelatedSiteUrl(game: GameDoc, linkType: "Cover" | "Official Site" | "ErogameScape" | "Blog"): string | null {
  try {
    const linkEntry = game.metadata.relatedSites.find((entry) => entry.label === linkType)

    if (linkEntry && linkEntry.url) {
      return linkEntry.url
    }

    return null
  } catch (error) {
    console.warn(`Failed to extract URL for game ${game._id}:`, error)
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
