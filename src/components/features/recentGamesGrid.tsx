"use client"

import { useTranslation } from "react-i18next"
import { GameDoc } from "@/lib/db/documents"
import { GameCard } from "@/components/features/gameCard"

interface RecentGamesGridProps {
  games: GameDoc[]
}

export function RecentGamesGrid({ games }: RecentGamesGridProps) {
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
      {games.map((game, index) => (
        <GameCard key={game._id} game={game} index={index} />
      ))}
    </div>
  )
}
