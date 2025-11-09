import { Card, CardBody, CardFooter } from "@heroui/card"
import { Chip } from "@heroui/chip"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { getCoverUrl, getOfficialSiteUrl, getGameTitle, getPlayStatusConfig } from "@/lib/utils/gameData"
import type { GameDoc } from "@/lib/db/documents"

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
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-default-400">
              {t("gameCard.noCover")}
            </div>
          )}
        </div>
      </CardBody>
      <CardFooter className="flex flex-col items-start gap-2 p-3">
        <p className="text-sm font-semibold line-clamp-2 w-full" title={title}>
          {title}
        </p>
        <Chip
          size="sm"
          color={playStatusConfig.color}
          variant="flat"
        >
          {t(`playStatus.${game.record.playStatus}`)}
        </Chip>
      </CardFooter>
    </Card>
  )

  if (officialSiteUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.3 }}
      >
        <Link
          href={officialSiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {cardContent}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
    >
      {cardContent}
    </motion.div>
  )
}
