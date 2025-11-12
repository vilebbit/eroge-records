import { Suspense } from "react"
import { Skeleton } from "@heroui/skeleton"
import { cacheLife } from "next/cache"
import { queryCollections, queryAllGames } from "@/lib/db"
import { Collections } from "./collections"

export default async function CollectionsPage() {
  "use cache"
  cacheLife("days")

  const collectionsPromise = queryCollections()
  const gamesPromise = queryAllGames()

  return (
    <Suspense
      fallback={
        <div className="w-full">
          <Skeleton className="w-64 h-10 mb-8 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="w-full aspect-video rounded-lg" />
            ))}
          </div>
        </div>
      }
    >
      <Collections collectionsPromise={collectionsPromise} gamesPromise={gamesPromise} />
    </Suspense>
  )
}
