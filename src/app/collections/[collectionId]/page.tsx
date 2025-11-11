import { Suspense } from "react"
import { Skeleton } from "@heroui/skeleton"
import { cacheLife } from "next/cache"
import { queryCollections, queryAllGames } from "@/lib/db"
import { CollectionDetail } from "./collectionDetail"
import type { GameCollectionDoc } from "@/lib/db/documents"

interface CollectionPageProps {
  params: Promise<{
    collectionId: string
  }>
}

async function getCollection(collectionId: string): Promise<GameCollectionDoc | null> {
  "use cache"
  cacheLife("hours")

  const collections = await queryCollections()
  return collections.find(c => c._id === collectionId) || null
}

export async function generateStaticParams() {
  const collections = await queryCollections()
  return collections.map((collection) => ({
    collectionId: collection._id,
  }))
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  "use cache"
  cacheLife("minutes")

  const { collectionId } = await params
  const collectionPromise = getCollection(collectionId)
  const gamesPromise = queryAllGames()

  return (
    <Suspense
      fallback={
        <div className="w-full">
          <Skeleton className="w-96 h-10 mb-8 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-32 rounded-lg" />
            ))}
          </div>
        </div>
      }
    >
      <CollectionDetail
        collectionPromise={collectionPromise}
        gamesPromise={gamesPromise}
      />
    </Suspense>
  )
}
