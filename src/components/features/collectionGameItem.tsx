"use client"

import { Card, CardBody } from "@heroui/card"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { formatPlaytime } from "@/lib/utils/time"
import { getCoverUrl, getOfficialSiteUrl, getGameTitle } from "@/lib/utils/gameData"
import type { GameDoc } from "@/lib/db/documents"

interface CollectionGameItemProps {
  game: GameDoc
  index: number
}

export function CollectionGameItem({ game, index }: CollectionGameItemProps) {
  const coverUrl = getCoverUrl(game)
  const officialSiteUrl = getOfficialSiteUrl(game)
  const title = getGameTitle(game)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
    >
      <Card
        isPressable={!!officialSiteUrl}
        className="group hover:scale-105 transition-transform duration-300"
      >
        <CardBody className="p-0 overflow-hidden">
          <div className="flex gap-4 p-4">
            {/* Cover Image */}
            <div className="relative w-24 h-32 shrink-0 rounded overflow-hidden bg-default-100">
              {coverUrl
                ? (
                  officialSiteUrl
                    ? (
                      <Link href={officialSiteUrl} target="_blank" rel="noopener noreferrer">
                        <Image
                          src={coverUrl}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                          sizes="96px"
                        />
                      </Link>
                    )
                    : (
                      <Image
                        src={coverUrl}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="96px"
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
            <div className="flex-1 min-w-0">
              <div className="mb-2">
                {officialSiteUrl
                  ? (
                    <Link
                      href={officialSiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-primary hover:underline line-clamp-2"
                    >
                      {title}
                    </Link>
                  )
                  : (
                    <h3 className="text-lg font-bold line-clamp-2">{title}</h3>
                  )}
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div>
                  <span className="text-default-500">Score: </span>
                  <span className="font-semibold text-primary">
                    {game.record.score.toFixed(1)}
                  </span>
                </div>
                <div>
                  <span className="text-default-500">Playtime: </span>
                  <span className="font-semibold">
                    {formatPlaytime(game.record.playTime)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}
