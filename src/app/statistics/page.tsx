"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Skeleton } from "@heroui/skeleton"
import { RecentGamesGrid } from "@/components/features/recentGamesGrid"
import { PlaytimeChart } from "@/components/features/playtimeChart"
import { GameDoc } from "@/lib/db/documents"
import { getRecentGames } from "./actions"

export default function StatisticsPage() {
  const { t } = useTranslation()
  const [games, setGames] = useState<GameDoc[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGames() {
      try {
        const data = await getRecentGames()
        setGames(data)
      } catch (error) {
        console.error("Failed to load games:", error)
      } finally {
        setLoading(false)
      }
    }
    loadGames()
  }, [])

  if (loading) {
    return (
      <div className="w-full">
        <Skeleton className="w-64 h-10 mb-8 rounded" />
        <div className="mb-12">
          <Skeleton className="w-48 h-8 mb-6 rounded" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="w-full aspect-3/4 rounded-lg" />
                <Skeleton className="w-3/4 h-4 rounded" />
                <Skeleton className="w-1/2 h-6 rounded-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="mb-12">
          <Skeleton className="w-56 h-8 mb-6 rounded" />
          <div className="bg-content1 rounded-lg p-6 border border-default-200">
            <Skeleton className="w-full h-[600px] rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">{t("statistics.title")}</h1>

      <RecentGamesGrid games={games} />
      <PlaytimeChart games={games} />
    </div>
  )
}
