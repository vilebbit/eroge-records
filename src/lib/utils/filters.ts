import type { GameDoc } from "../db"

export function getYearGames(games: GameDoc[], year?: number): GameDoc[] {
  if (!year || year === 0) {
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    return games.filter(game => {
      const lastRunDate = new Date(game.record.lastRunDate)
      return lastRunDate >= oneYearAgo
    })
  }

  const after = new Date(year, 0, 1)
  const before = new Date(year, 11, 31, 23, 59, 59, 999)

  return games.filter(game => {
    const lastRunDate = new Date(game.record.lastRunDate)
    return before >= lastRunDate && lastRunDate >= after
  })
}
