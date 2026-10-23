"use client"

import { Table } from "@heroui/react/table"
import { Chip } from "@heroui/react/chip"
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
import { motion } from "framer-motion"

interface RatingTableProps {
  title: string
  games: GameDoc[]
  index?: number
}

export function RatingTable({ title, games, index = 0 }: RatingTableProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      <h2 className="text-xl font-bold mb-4">{t(title)}</h2>
      <div className="bg-surface rounded-lg border border-border overflow-x-auto">
        {
          games.length === 0
            ? <p className="text-center text-muted">{t("ratingTable.noGames")}</p>
            : <Table className="shadow-none rounded-none">
              <Table.ScrollContainer>
                <Table.Content aria-label={t(title)}>
                  <Table.Header>
                    <Table.Column className="w-16">{t("ratingTable.columns.score")}</Table.Column>
                    <Table.Column className="w-24">{t("ratingTable.columns.coverImage")}</Table.Column>
                    <Table.Column isRowHeader className="min-w-42">{t("ratingTable.columns.name")}</Table.Column>
                    <Table.Column className="w-48 hidden md:table-cell">{t("ratingTable.columns.brand")}</Table.Column>
                    <Table.Column className="w-28 hidden md:table-cell">{t("ratingTable.columns.releaseDate")}</Table.Column>
                    <Table.Column className="w-32">{t("ratingTable.columns.playStatus")}</Table.Column>
                    <Table.Column className="w-24 text-right">{t("ratingTable.columns.playtime")}</Table.Column>
                    <Table.Column className="w-28 hidden sm:table-cell">{t("ratingTable.columns.lastRunDate")}</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {games.map((game) => {
                      const coverUrl = getGameRelatedSiteUrl(game, "Cover")
                      const officialSiteUrl = getGameRelatedSiteUrl(game, "Official Site")
                      const erogeScapeUrl = getGameRelatedSiteUrl(game, "ErogameScape")
                      const title = getGameTitle(game)
                      const developers = getDevelopers(game)
                      const playStatusConfig = getPlayStatusConfig(game.record.playStatus)

                      return (
                        <Table.Row id={game._id} key={game._id} className="hover:bg-default/50 dark:hover:bg-default">
                          <Table.Cell>
                            <span className={`font-semibold ${getScoreColor(game.record.score)}`}>
                              {game.record.score < 0 ? "N/A" : game.record.score.toFixed(1)}
                            </span>
                          </Table.Cell>
                          <Table.Cell>
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
                                  <div className="w-20 h-20 bg-default rounded flex items-center justify-center text-xs text-muted">
                                    {t("gameCard.noCover")}
                                  </div>
                                )}
                          </Table.Cell>
                          <Table.Cell>
                            {erogeScapeUrl
                              ? (
                                <Link
                                  href={erogeScapeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block w-fit text-foreground/80 hover:underline font-medium"
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
                          </Table.Cell>
                          <Table.Cell className="hidden md:table-cell">
                            <span className="text-sm text-foreground/80 line-clamp-1" title={developers}>
                              {developers}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="hidden md:table-cell">
                            <span className="text-sm text-foreground/80 line-clamp-1">
                              {game.metadata.releaseDate}
                            </span>
                          </Table.Cell>
                          <Table.Cell>
                            <Chip className={`text-sm ${playStatusConfig.className ?? ""}`} color={playStatusConfig.color} variant="soft">
                              {t(`playStatus.${playStatusConfig.key}`)}
                            </Chip>
                          </Table.Cell>
                          <Table.Cell className="text-right">
                            <span className="text-sm">
                              {formatPlaytime(game.record.playTime)}
                            </span>
                          </Table.Cell>
                          <Table.Cell className="hidden sm:table-cell">
                            <span className="text-sm text-foreground/80">
                              {formatDate(game.record.lastRunDate)}
                            </span>
                          </Table.Cell>
                        </Table.Row>
                      )
                    })}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
        }
      </div>
    </motion.div>
  )
}
