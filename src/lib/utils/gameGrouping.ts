import { ScoreRange, ScoreRangeGroup } from "@/lib/types/common"
import type { GameDoc } from "@/lib/db/documents"

/**
 * Determines which score range a game belongs to
 * @param score - Game score (0-10)
 * @returns ScoreRange category
 */
export function getScoreRange(score: number): ScoreRange {
  if (score === 10) return "10.0"
  if (score >= 9 && score < 10) return "9.0-9.9"
  if (score >= 8 && score < 9) return "8.0-8.9"
  if (score >= 7 && score < 8) return "7.0-7.9"
  if (score >= 6 && score < 7) return "6.0-6.9"
  return "<6.0"
}

/**
 * Gets the translation key for a score range
 * @param range - ScoreRange value
 * @returns Translation key string
 */
export function getScoreRangeTranslationKey(range: ScoreRange): string {
  const keyMap: Record<ScoreRange, string> = {
    "10.0": "ratingTable.ranges.perfect",
    "9.0-9.9": "ratingTable.ranges.excellent",
    "8.0-8.9": "ratingTable.ranges.great",
    "7.0-7.9": "ratingTable.ranges.good",
    "6.0-6.9": "ratingTable.ranges.fair",
    "<6.0": "ratingTable.ranges.poor",
  }
  return keyMap[range]
}

/**
 * Groups games by score ranges
 * @param games - Array of GameDoc objects
 * @returns Array of ScoreRangeGroup objects
 */
export function groupGamesByScore(games: GameDoc[]): ScoreRangeGroup[] {
  const groups: Record<ScoreRange, GameDoc[]> = {
    "10.0": [],
    "9.0-9.9": [],
    "8.0-8.9": [],
    "7.0-7.9": [],
    "6.0-6.9": [],
    "<6.0": [],
  }

  // Group games by score range
  games.forEach((game) => {
    const range = getScoreRange(game.record.score)
    groups[range].push(game)
  })

  // Sort games within each group by score desc, then lastRunDate desc
  Object.keys(groups).forEach((range) => {
    groups[range as ScoreRange].sort((a, b) => {
      // First sort by score descending
      if (b.record.score !== a.record.score) {
        return b.record.score - a.record.score
      }
      // Then sort by lastRunDate descending
      return new Date(b.record.lastRunDate).getTime() - new Date(a.record.lastRunDate).getTime()
    })
  })

  // Convert to array of ScoreRangeGroup objects
  const rangeOrder: ScoreRange[] = ["10.0", "9.0-9.9", "8.0-8.9", "7.0-7.9", "6.0-6.9", "<6.0"]

  return rangeOrder.map((range) => ({
    range,
    label: getScoreRangeTranslationKey(range),
    games: groups[range],
  }))
}
