"use client"

import { useTranslation } from "react-i18next"
import { GameCard } from "@/components/features/gameCard"
import type { GameDoc } from "@/lib/db/documents"

interface RecentGamesGridProps {
  games: GameDoc[],
  limitGames: number,
}

export function RecentGamesGrid({ games, limitGames }: RecentGamesGridProps) {
  const { t } = useTranslation()

  if (games.length === 0) {
    return (
      <div className="text-center py-12 text-default-400">
        {t("statistics.noGamesFound")}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {games.slice(0, limitGames).map((game, index) => (
        <GameCard key={game._id} game={game} index={index} />
      ))}
    </div>
  )
}
