"use client"

import { use } from "react"
import { useTranslation } from "react-i18next"
import { PlaytimeChart } from "@/components/features/playtimeChart"
import type { GameDoc } from "@/lib/db/documents"
import { getRecentOneYearGames } from "@/lib/utils/filters"

export function Statistics({
  gamesPromise,
}: {
  gamesPromise: Promise<GameDoc[]>,
}) {
  const { t } = useTranslation()

  const games = use(gamesPromise)
  const recentGames = getRecentOneYearGames(games)

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">{t("statistics.title")}</h1>
      <h1 className="text-xl mb-8">{t("statistics.lastOneYearPlaytimeChartTitle")}</h1>
      <PlaytimeChart games={recentGames} />
    </div>
  )
}
