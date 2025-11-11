import { Suspense } from "react"
import { Skeleton } from "@heroui/skeleton"
import { cacheLife } from "next/cache"
import { queryAllGames } from "@/lib/db"
import { Home } from "./home"

export default async function HomePage() {
  "use cache"
  cacheLife("minutes")

  const gamesPromise = queryAllGames()

  return (
    <Suspense
      fallback={
        <div className="w-full">
          {/* Title skeleton */}
          <div className="mb-8">
            <Skeleton className="w-96 h-12 mb-4 rounded" />
            <Skeleton className="w-full max-w-2xl h-6 rounded" />
          </div>

          {/* Lifetime records skeleton */}
          <div className="mb-12">
            <Skeleton className="w-48 h-8 mb-4 rounded" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Recently playing games skeleton */}
          <div className="mb-12">
            <Skeleton className="w-56 h-8 mb-4 rounded" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-full aspect-3/4 rounded-lg" />
                  <Skeleton className="w-3/4 h-4 rounded" />
                  <Skeleton className="w-1/2 h-6 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Recently completed games skeleton */}
          <div className="mb-12">
            <Skeleton className="w-56 h-8 mb-4 rounded" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="w-full aspect-3/4 rounded-lg" />
                  <Skeleton className="w-3/4 h-4 rounded" />
                  <Skeleton className="w-1/2 h-6 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <Home gamesPromise={gamesPromise} />
    </Suspense>
  )
}
