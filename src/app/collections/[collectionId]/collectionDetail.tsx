"use client"

import { use } from "react"
import { useTranslation } from "react-i18next"
import { CollectionGameItem } from "@/components/features/collectionGameItem"
import type { GameCollectionDoc, GameDoc } from "@/lib/db/documents"

interface CollectionDetailProps {
  collectionPromise: Promise<GameCollectionDoc | null>
  gamesPromise: Promise<GameDoc[]>
}

export function CollectionDetail({ collectionPromise, gamesPromise }: CollectionDetailProps) {
  const { t } = useTranslation()
  const collection = use(collectionPromise)
  const allGames = use(gamesPromise)

  if (!collection) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-danger mb-4">
          {t("error.title")}
        </h1>
        <p className="text-default-600">
          {t("collections.noCollections")}
        </p>
      </div>
    )
  }

  // Filter games that belong to this collection
  const gamesMap = new Map(allGames.map(game => [game._id, game]))
  const collectionGames = collection.games
    .map(gameId => gamesMap.get(gameId))
    .filter((game): game is GameDoc => game !== undefined)

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-8">
        {t("collections.collectionDetail", { name: collection.name })}
      </h1>

      {collectionGames.length === 0
        ? (
          <div className="text-center py-12 text-default-400">
            {t("collections.noGamesInCollection")}
          </div>
        )
        : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collectionGames.map((game, index) => (
              <CollectionGameItem
                key={game._id}
                game={game}
                index={index}
              />
            ))}
          </div>
        )}
    </div>
  )
}
