"use client"

import { Card, CardBody } from "@heroui/card"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { formatPlaytime } from "@/lib/utils/time"
import { getGameRelatedSiteUrl, getGameTitle, getDevelopers } from "@/lib/utils/gameData"
import type { GameDoc } from "@/lib/db/documents"
import { GenreChips } from "./genreChips"
import { useTranslation } from "react-i18next"
import { getScoreColor } from "@/lib/utils/gameGrouping"

interface CollectionGameItemProps {
  game: GameDoc
  index: number
}

export function CollectionGameItem({ game, index }: CollectionGameItemProps) {
  const { t } = useTranslation()

  const coverUrl = getGameRelatedSiteUrl(game, "Cover")
  const officialSiteUrl = getGameRelatedSiteUrl(game, "Official Site")
  const erogeScapeUrl = getGameRelatedSiteUrl(game, "ErogameScape")
  const blogUrl = getGameRelatedSiteUrl(game, "Blog")
  const title = getGameTitle(game)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Card
        className="w-full h-full hover:scale-103 transition-transform duration-300"
      >
        <CardBody className="p-0 overflow-hidden">
          <div className="flex gap-4">
            {/* Cover Image */}
            <div className="relative w-36 h-48 shrink-0 rounded overflow-hidden bg-default-100">
              {coverUrl
                ? (
                  officialSiteUrl
                    ? (
                      <Link href={officialSiteUrl} target="_blank" rel="noopener noreferrer">
                        <div className="relative w-full h-full">
                          <Image
                            src={coverUrl}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            sizes="192px"
                          />
                        </div>
                      </Link>
                    )
                    : (
                      <Image
                        src={coverUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="192px"
                      />
                    )
                )
                : (
                  <div className="flex items-center justify-center h-full text-default-400 text-xs">
                    No Cover
                  </div>
                )}
            </div>

            {/* Game Info */}
            <div className="py-2 flex-1 min-w-0">
              <div className="">
                {erogeScapeUrl
                  ? (
                    <Link
                      href={erogeScapeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-default-700 hover:underline line-clamp-1 w-fit"
                    >
                      {title}
                    </Link>
                  )
                  : (
                    <h3 className="text-lg font-bold line-clamp-2">{title}</h3>
                  )}
              </div>

              <div className="text-sm text-default-500">
                <span>{getDevelopers(game)}</span>
              </div>

              <div className="mb-2 text-sm text-default-500">
                <span>{game.metadata.releaseDate}</span>
              </div>

              <div className="mb-2 flex flex-wrap gap-x-4 text-sm">
                <div>
                  <span className="text-default-500">Score: </span>
                  <span className={`font-semibold ${getScoreColor(game.record.score)}`}>
                    {game.record.score > 0 ? game.record.score.toFixed(1) : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-default-500">Playtime: </span>
                  <span className="font-semibold">
                    {formatPlaytime(game.record.playTime)}
                  </span>
                </div>
              </div>

              <div className="mb-2">
                <GenreChips genres={game.metadata.genres} />
              </div>

              {
                blogUrl && (
                  <div className="">
                    <Link
                      href={blogUrl}
                      target="_blank"
                      rel="noopener"
                      className="text-sm font-medium text-primary/90 hover:underline line-clamp-1 w-fit"
                    >
                      {t("collections.blogLink")}
                    </Link>
                  </div>
                )
              }
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
