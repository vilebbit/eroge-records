import { Suspense } from "react"
import { Skeleton } from "@heroui/skeleton"
import { cacheLife } from "next/cache"
import { queryCollections, queryAllGames } from "@/lib/db"
import { CollectionDetail } from "./collectionDetail"
import type { GameCollectionDoc } from "@/lib/db/documents"
import type { Metadata } from "next"

interface CollectionPageProps {
  params: Promise<{
    collectionId: string
  }>
}

export async function generateMetadata(
  { params }: { params: Promise<{ collectionId: string }> },
): Promise<Metadata> {
  "use cache"
  cacheLife("days")

  const { collectionId } = await params
  const collection = await getCollection(collectionId)
  return {
    title: collection?.name ?? "Collections",
    description: collection
      ? `Explore the "${collection.name}" collection of curated eroges`
      : "Curated collections of excellent eroges across various genres",
  }
}

async function getCollection(collectionId: string): Promise<GameCollectionDoc | null> {
  "use cache"
  cacheLife("days")

  const collections = await queryCollections()
  return collections.find(c => c._id === collectionId) || null
}

export async function generateStaticParams() {
  "use cache"
  cacheLife("days")

  const collections = await queryCollections()
  return collections.map((collection) => ({
    collectionId: collection._id,
  }))
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  "use cache"
  cacheLife("days")

  const { collectionId } = await params
  const collectionPromise = getCollection(collectionId)
  const gamesPromise = queryAllGames()

  return (
    <Suspense
      fallback={
        <div className="w-full">
          <Skeleton className="w-96 h-10 mb-8 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
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
