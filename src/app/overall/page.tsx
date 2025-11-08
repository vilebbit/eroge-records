"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Skeleton } from "@heroui/skeleton"
import { Card, CardBody } from "@heroui/card"
import { RatingTable } from "@/components/features/ratingTable"
import { GameDoc } from "@/lib/db/documents"
import { groupGamesByScore } from "@/lib/utils/gameGrouping"
import { formatPlaytime } from "@/lib/utils/time"
import { getAllGamesSortByScore } from "./actions"

export default function OverallPage() {
  const { t } = useTranslation()
  const [games, setGames] = useState<GameDoc[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadGames() {
      try {
        const data = await getAllGamesSortByScore()
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
        <Skeleton className="w-80 h-10 mb-8 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="mb-8">
            <Skeleton className="w-48 h-8 mb-4 rounded" />
            <Skeleton className="w-full h-96 rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  const totalGames = games.length
  const totalPlaytime = games.reduce((sum, game) => sum + game.record.playTime, 0)
  const averageScore =
    games.length > 0
      ? games.reduce((sum, game) => sum + game.record.score, 0) / games.length
      : 0

  const groupedGames = groupGamesByScore(games)

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">{t("overall.title")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardBody className="text-center">
            <p className="text-sm text-default-600 mb-1">{t("overall.totalGames")}</p>
            <p className="text-3xl font-bold text-primary">{totalGames}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-sm text-default-600 mb-1">{t("overall.totalPlaytime")}</p>
            <p className="text-3xl font-bold text-secondary">{formatPlaytime(totalPlaytime)}</p>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <p className="text-sm text-default-600 mb-1">{t("overall.averageScore")}</p>
            <p className="text-3xl font-bold text-success">{averageScore.toFixed(2)}</p>
          </CardBody>
        </Card>
      </div>

      {groupedGames.map((group) => (
        <RatingTable key={group.range} title={group.label} games={group.games} />
      ))}
    </div>
  )
}
