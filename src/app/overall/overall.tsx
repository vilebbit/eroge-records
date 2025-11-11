"use client"

import { use } from "react"
import { useTranslation } from "react-i18next"
import { RatingTable } from "@/components/features/ratingTable"
import { groupGamesByScore } from "@/lib/utils/gameGrouping"
import { formatPlaytime } from "@/lib/utils/time"
import type { GameDoc } from "@/lib/db/documents"
import { DataCard } from "@/components/features/dataCard"
import { PLAY_STATUS_CONFIG } from "@/lib/types/common"

export function Overall({ gamesPromise }: { gamesPromise: Promise<GameDoc[]> }) {
  const { t } = useTranslation()
  const games = use(gamesPromise)

  const totalGames = games.length

  let totalPlaytime = 0
  let averageScore = 0
  let averageTotal = 0
  let countFinished = 0
  let countPartial = 0
  let countPlaying = 0
  let countMultiple = 0
  let countShelved = 0

  for (const game of games) {
    totalPlaytime += game.record.playTime
    if (game.record.score && game.record.score >= 0) {
      averageScore += game.record.score
      averageTotal += 1
    }
    switch (game.record.playStatus) {
      case "finished":
        countFinished += 1
        break
      case "partial":
        countPartial += 1
        break
      case "playing":
        countPlaying += 1
        break
      case "multiple":
        countMultiple += 1
        break
      case "shelved":
        countShelved += 1
        break
    }
  }

  const groupedGames = groupGamesByScore(games)

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">{t("overall.title")}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <DataCard
          upperText={t("overall.totalGames")}
          mainText={totalGames.toString()}
          className="text-primary"
          index={0}
        />
        <DataCard
          upperText={t("overall.totalPlaytime")}
          mainText={formatPlaytime(totalPlaytime)}
          className="text-secondary"
          index={1}
        />
        <DataCard
          upperText={t("overall.averageScore")}
          mainText={(averageScore / averageTotal).toFixed(2)}
          className="text-success"
          index={2}
        />
      </div>

      <div className="hidden sm:grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
        <DataCard
          upperText={t("playStatus.finished")}
          mainText={countFinished.toString()}
          className={`text-${PLAY_STATUS_CONFIG.finished.color}`}
          index={3}
        />
        <DataCard
          upperText={t("playStatus.partial")}
          mainText={countPartial.toString()}
          className={`text-${PLAY_STATUS_CONFIG.partial.color}`}
          index={4}
        />
        <DataCard
          upperText={t("playStatus.playing")}
          mainText={countPlaying.toString()}
          className={`text-${PLAY_STATUS_CONFIG.playing.color}`}
          index={5}
        />
        <DataCard
          upperText={t("playStatus.multiple")}
          mainText={countMultiple.toString()}
          className={`text-${PLAY_STATUS_CONFIG.multiple.color}`}
          index={6}
        />
        <DataCard
          upperText={t("playStatus.shelved")}
          mainText={countShelved.toString()}
          className={`text-${PLAY_STATUS_CONFIG.shelved.color}`}
          index={7}
        />
      </div>

      {groupedGames.map((group) => (
        <RatingTable key={group.range} title={group.label} games={group.games} />
      ))}
    </div>
  )
}
