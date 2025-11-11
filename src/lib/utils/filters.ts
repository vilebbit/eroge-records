import type { GameDoc } from "../db"

// Filter games played within the last year
export function getRecentOneYearGames(games: GameDoc[]): GameDoc[] {
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  return games.filter(game => {
    const lastRunDate = new Date(game.record.lastRunDate)
    return lastRunDate >= oneYearAgo
  })
}
