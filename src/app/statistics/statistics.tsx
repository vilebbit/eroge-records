"use client"

import { use } from "react"
import { useTranslation } from "react-i18next"
import { RecentGamesGrid } from "@/components/features/recentGamesGrid"
import { PlaytimeChart } from "@/components/features/playtimeChart"
import type { GameDoc } from "@/lib/db/documents"

export function Statistics({
  gamesPromise,
  limitGames,
}: {
  gamesPromise: Promise<GameDoc[]>,
  limitGames: number,
}) {
  const { t } = useTranslation()

  const games = use(gamesPromise)

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">{t("statistics.title")}</h1>
      <RecentGamesGrid games={games} limitGames={limitGames} />
      <PlaytimeChart games={games} />
    </div>
  )
}
