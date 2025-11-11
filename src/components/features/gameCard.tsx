import { Card, CardBody, CardFooter } from "@heroui/card"
import { Chip } from "@heroui/chip"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { getCoverUrl, getOfficialSiteUrl, getGameTitle, getPlayStatusConfig } from "@/lib/utils/gameData"
import type { GameDoc } from "@/lib/db/documents"
import { formatDate } from "@/lib/utils/date"

interface GameCardProps {
  game: GameDoc
  index?: number
}

export function GameCard({ game, index = 0 }: GameCardProps) {
  const { t } = useTranslation()
  const coverUrl = getCoverUrl(game)
  const officialSiteUrl = getOfficialSiteUrl(game)
  const title = getGameTitle(game)
  const playStatusConfig = getPlayStatusConfig(game.record.playStatus)

  const cardContent = (
    <Card className="w-full h-full hover:scale-105 transition-transform duration-200">
      <CardBody className="p-0 overflow-hidden">
        <div className="relative w-full aspect-3/4 bg-default-100">
          {coverUrl
            ? (
              <Image
                src={coverUrl}
                alt={title}
                referrerPolicy="no-referrer"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            )
            : (
              <div className="w-full h-full flex items-center justify-center text-default-400">
                {t("gameCard.noCover")}
              </div>
            )}
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-2 p-3">
        <p className="text-sm font-semibold line-clamp-1 w-full" title={title}>
          {title}
        </p>
        <div className="w-full flex justify-between items-center">
          <Chip
            className="text-sm"
            color={playStatusConfig.color}
            variant="flat"
          >
            {t(`playStatus.${game.record.playStatus}`)}
          </Chip>
          <div className="text-sm text-default-600">
            {formatDate(game.record.lastRunDate)}
          </div>
        </div>
      </CardFooter>
    </Card>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      {
        officialSiteUrl
          ? <Link
            href={officialSiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {cardContent}
          </Link>
          : cardContent
      }
    </motion.div>
  )
}
