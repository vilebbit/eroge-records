"use client"

import { use } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardBody } from "@heroui/card"
import { RatingTable } from "@/components/features/ratingTable"
import { groupGamesByScore } from "@/lib/utils/gameGrouping"
import { formatPlaytime } from "@/lib/utils/time"
import type { GameDoc } from "@/lib/db/documents"

export function Overall({ gamesPromise }: { gamesPromise: Promise<GameDoc[]> }) {
  const { t } = useTranslation()
  const games = use(gamesPromise)

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
