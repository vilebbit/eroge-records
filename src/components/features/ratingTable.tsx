"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table"
import { Chip } from "@heroui/chip"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import {
  getCoverUrl,
  getOfficialSiteUrl,
  getGameTitle,
  getDevelopers,
  getPlayStatusConfig,
} from "@/lib/utils/gameData"
import { formatPlaytime } from "@/lib/utils/time"
import { formatDate } from "@/lib/utils/date"
import type { GameDoc } from "@/lib/db/documents"

interface RatingTableProps {
  title: string
  games: GameDoc[]
}

export function RatingTable({ title, games }: RatingTableProps) {
  const { t } = useTranslation()

  if (games.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">{t(title)}</h2>
        <div className="bg-content1 rounded-lg p-6 border border-default-200">
          <p className="text-center text-default-400">{t("ratingTable.noGames")}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{t(title)}</h2>
      <div className="bg-content1 rounded-lg border border-default-200 overflow-x-auto">
        <Table
          aria-label={t(title)}
          classNames={{
            wrapper: "shadow-none rounded-none",
          }}
        >
          <TableHeader>
            <TableColumn className="w-16">{t("ratingTable.columns.score")}</TableColumn>
            <TableColumn className="w-24">{t("ratingTable.columns.coverImage")}</TableColumn>
            <TableColumn>{t("ratingTable.columns.name")}</TableColumn>
            <TableColumn className="hidden md:table-cell">{t("gameCard.brand")}</TableColumn>
            <TableColumn className="w-32">{t("ratingTable.columns.playStatus")}</TableColumn>
            <TableColumn className="w-24 text-right">{t("ratingTable.columns.playtime")}</TableColumn>
            <TableColumn className="w-28 hidden sm:table-cell">{t("ratingTable.columns.lastRunDate")}</TableColumn>
          </TableHeader>
          <TableBody>
            {games.map((game) => {
              const coverUrl = getCoverUrl(game)
              const officialSiteUrl = getOfficialSiteUrl(game)
              const title = getGameTitle(game)
              const developers = getDevelopers(game)
              const playStatusConfig = getPlayStatusConfig(game.record.playStatus)

              return (
                <TableRow key={game._id} className="hover:bg-default-50 dark:hover:bg-default-100">
                  <TableCell>
                    <span className="font-semibold text-primary">
                      {game.record.score.toFixed(1)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {coverUrl && officialSiteUrl ? (
                      <Link
                        href={officialSiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <div className="relative w-16 h-20 rounded overflow-hidden hover:scale-105 transition-transform">
                          <Image
                            src={coverUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                      </Link>
                    ) : coverUrl ? (
                      <div className="relative w-16 h-20 rounded overflow-hidden">
                        <Image
                          src={coverUrl}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-20 bg-default-100 rounded flex items-center justify-center text-xs text-default-400">
                        {t("gameCard.noCover")}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    {officialSiteUrl ? (
                      <Link
                        href={officialSiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                        title={title}
                      >
                        <span className="line-clamp-2">{title}</span>
                      </Link>
                    ) : (
                      <span className="font-medium line-clamp-2" title={title}>
                        {title}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="text-sm text-default-600 line-clamp-1" title={developers}>
                      {developers}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Chip size="sm" color={playStatusConfig.color} variant="flat">
                      {t(`playStatus.${playStatusConfig.key}`)}
                    </Chip>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-mono">
                      {formatPlaytime(game.record.playTime)}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <span className="text-sm text-default-600">
                      {formatDate(game.record.lastRunDate)}
                    </span>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
