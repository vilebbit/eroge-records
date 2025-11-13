"use client"

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table"
import { Chip } from "@heroui/chip"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import {
  getGameRelatedSiteUrl,
  getGameTitle,
  getDevelopers,
  getPlayStatusConfig,
} from "@/lib/utils/gameData"
import { formatPlaytime } from "@/lib/utils/time"
import { formatDate } from "@/lib/utils/date"
import type { GameDoc } from "@/lib/db/documents"
import { getScoreColor } from "@/lib/utils/gameGrouping"

interface RatingTableProps {
  title: string
  games: GameDoc[]
}

export function RatingTable({ title, games }: RatingTableProps) {
  const { t } = useTranslation()

  return (
    <div className="mb-8 animate-leftin">
      <h2 className="text-xl font-bold mb-4">{t(title)}</h2>
      <div className="bg-content1 rounded-lg border border-default-200 overflow-x-auto">
        {
          games.length === 0
            ? <p className="text-center text-default-400">{t("ratingTable.noGames")}</p>
            : <Table
              // isVirtualized
              // rowHeight={96}
              aria-label={t(title)}
              classNames={{
                wrapper: "shadow-none rounded-none",
              }}
            >
              <TableHeader>
                <TableColumn className="w-16">{t("ratingTable.columns.score")}</TableColumn>
                <TableColumn className="w-24">{t("ratingTable.columns.coverImage")}</TableColumn>
                <TableColumn className="min-w-42">{t("ratingTable.columns.name")}</TableColumn>
                <TableColumn className="w-48 hidden md:table-cell">{t("ratingTable.columns.brand")}</TableColumn>
                <TableColumn className="w-28 hidden md:table-cell">{t("ratingTable.columns.releaseDate")}</TableColumn>
                <TableColumn className="w-32">{t("ratingTable.columns.playStatus")}</TableColumn>
                <TableColumn className="w-24 text-right">{t("ratingTable.columns.playtime")}</TableColumn>
                <TableColumn className="w-28 hidden sm:table-cell">{t("ratingTable.columns.lastRunDate")}</TableColumn>
              </TableHeader>
              <TableBody>
                {games.map((game) => {
                  const coverUrl = getGameRelatedSiteUrl(game, "Cover")
                  const officialSiteUrl = getGameRelatedSiteUrl(game, "Official Site")
                  const erogeScapeUrl = getGameRelatedSiteUrl(game, "ErogameScape")
                  const title = getGameTitle(game)
                  const developers = getDevelopers(game)
                  const playStatusConfig = getPlayStatusConfig(game.record.playStatus)

                  return (
                    <TableRow key={game._id} className="hover:bg-default-50 dark:hover:bg-default-100">
                      <TableCell>
                        <span className={`font-semibold ${getScoreColor(game.record.score)}`}>
                          {game.record.score < 0 ? "N/A" : game.record.score.toFixed(1)}
                        </span>
                      </TableCell>
                      <TableCell>
                        {coverUrl && officialSiteUrl
                          ? (
                            <Link
                              href={officialSiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <div className="relative w-20 h-20 rounded overflow-hidden hover:scale-105 transition-transform">
                                <Image
                                  src={coverUrl}
                                  alt={title}
                                  fill
                                  className="object-cover"
                                  sizes="100px"
                                />
                              </div>
                            </Link>
                          )
                          : coverUrl
                            ? (
                              <div className="relative w-20 h-20 rounded overflow-hidden">
                                <Image
                                  src={coverUrl}
                                  alt={title}
                                  referrerPolicy="no-referrer"
                                  fill
                                  className="object-cover"
                                  sizes="100px"
                                />
                              </div>
                            )
                            : (
                              <div className="w-20 h-20 bg-default-100 rounded flex items-center justify-center text-xs text-default-400">
                                {t("gameCard.noCover")}
                              </div>
                            )}
                      </TableCell>
                      <TableCell>
                        {erogeScapeUrl
                          ? (
                            <Link
                              href={erogeScapeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-fit text-default-600 hover:underline font-medium"
                              title={title}
                            >
                              <span className="line-clamp-2">{title}</span>
                            </Link>
                          )
                          : (
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
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-default-600 line-clamp-1">
                          {game.metadata.releaseDate}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Chip className="text-sm" color={playStatusConfig.color} variant="flat">
                          {t(`playStatus.${playStatusConfig.key}`)}
                        </Chip>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-sm">
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
        }
      </div>
    </div>
  )
}
