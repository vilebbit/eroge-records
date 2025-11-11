"use client"

import { use } from "react"
import { useTranslation } from "react-i18next"
import { GameCard } from "@/components/features/gameCard"
import { formatPlaytime } from "@/lib/utils/time"
import type { GameDoc } from "@/lib/db/documents"
import { getRecentOneYearGames } from "@/lib/utils/filters"
import { DataCard } from "@/components/features/dataCard"

export function Home({ gamesPromise }: { gamesPromise: Promise<GameDoc[]> }) {
  const { t } = useTranslation()
  const allGames = use(gamesPromise)

  // Calculate lifetime statistics
  const totalGames = allGames.length
  const playingGames = allGames.filter(game => game.record.playStatus === "playing").length
  const completedGames = allGames.filter(
    game => game.record.playStatus === "finished" || game.record.playStatus === "partial",
  ).length
  const totalPlaytime = allGames.reduce((sum, game) => sum + game.record.playTime, 0)

  // Filter games played within the last year
  const recentGames = getRecentOneYearGames(allGames)

  // Sort by lastRunDate descending
  const sortedRecentGames = recentGames.sort((a, b) => {
    return new Date(b.record.lastRunDate).getTime() - new Date(a.record.lastRunDate).getTime()
  })

  // Recently playing games (status: "playing")
  const recentlyPlaying = sortedRecentGames
    .filter(game => game.record.playStatus === "playing")
    .slice(0, 6)

  // Recently completed games (status: "partial" or "finished")
  const recentlyCompleted = sortedRecentGames
    .filter(game => game.record.playStatus === "partial" || game.record.playStatus === "finished")
    .slice(0, 6)

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{t("home.title")}</h1>
        <p className="text-default-600 text-lg">
          {t("home.description")}
        </p>
      </div>

      {/* Lifetime Records */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{t("home.lifetimeRecords")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DataCard
            upperText={t("home.totalGames")}
            mainText={totalGames.toString()}
            className="text-primary"
            index={0}
          />
          <DataCard
            upperText={t("home.playingGames")}
            mainText={playingGames.toString()}
            className="text-warning"
            index={1}
          />
          <DataCard
            upperText={t("home.completedGames")}
            mainText={completedGames.toString()}
            className="text-success"
            index={2}
          />
          <DataCard
            upperText={t("home.totalPlaytime")}
            mainText={formatPlaytime(totalPlaytime)}
            className="text-secondary"
            index={3}
          />
        </div>
      </div>

      {/* Recently Playing Games */}
      {recentlyPlaying.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t("home.recentlyPlaying")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {recentlyPlaying.map((game, index) => (
              <GameCard key={game._id} game={game} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Recently Completed Games */}
      {recentlyCompleted.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t("home.recentlyCompleted")}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {recentlyCompleted.map((game, index) => (
              <GameCard key={game._id} game={game} index={index} />
            ))}
          </div>
        </div>
      )}

      {recentlyPlaying.length === 0 && recentlyCompleted.length === 0 && (
        <div className="text-center py-12 text-default-400">
          {t("home.noRecentGames")}
        </div>
      )}
    </div>
  )
}
