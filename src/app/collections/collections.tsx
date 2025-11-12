"use client"

import { use } from "react"
import { useTranslation } from "react-i18next"
import { CollectionCard } from "@/components/features/collectionCard"
import { getGameRelatedSiteUrl } from "@/lib/utils/gameData"
import type { GameCollectionDoc, GameDoc } from "@/lib/db/documents"

interface CollectionsProps {
  collectionsPromise: Promise<GameCollectionDoc[]>
  gamesPromise: Promise<GameDoc[]>
}

export function Collections({ collectionsPromise, gamesPromise }: CollectionsProps) {
  const { t } = useTranslation()
  const collections = use(collectionsPromise)
  const games = use(gamesPromise)

  // Get cover URL for each collection (first game's cover)
  const collectionsWithCovers = collections.map(collection => {
    let coverUrl: string | null = null

    // Find the first game in the collection that has a cover
    for (const gameId of collection.games) {
      const game = games.find((g) => g._id === gameId)
      if (game) {
        const url = getGameRelatedSiteUrl(game, "Cover")
        if (url) {
          coverUrl = url
          break
        }
      }
    }

    return {
      ...collection,
      coverUrl,
      gamesCount: collection.games.length,
    }
  })

  if (collectionsWithCovers.length === 0) {
    return (
      <div className="text-center py-12 text-default-400">
        {t("collections.noCollections")}
      </div>
    )
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-4">{t("collections.title")}</h1>
      <h3 className="text-xl mb-8 text-default-600">{t("collections.description")}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collectionsWithCovers.map((collection, index) => (
          <CollectionCard
            key={collection._id}
            id={collection._id}
            name={collection.name}
            coverUrl={collection.coverUrl}
            gamesCount={collection.gamesCount}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
