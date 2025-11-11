"use client"

import { Card, CardBody } from "@heroui/card"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"

interface CollectionCardProps {
  id: string
  name: string
  coverUrl: string | null
  gamesCount: number
  index: number
}

export function CollectionCard({ id, name, coverUrl, gamesCount, index }: CollectionCardProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/collections/${id}`}>
        <Card
          isPressable
          className="group hover:scale-105 transition-transform duration-300 w-full h-full"
        >
          <CardBody className="p-0 overflow-hidden">
            <div className="relative w-full aspect-video bg-default-100">
              {coverUrl
                ? (
                  <Image
                    src={coverUrl}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )
                : (
                  <div className="flex items-center justify-center h-full text-default-400">
                    <span className="text-sm">{t("gameCard.noCover")}</span>
                  </div>
                )}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                  {name}
                </h3>
                <p className="text-white/80 text-sm">
                  {t("collections.gamesCount", { count: gamesCount })}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </Link>
    </motion.div>
  )
}
