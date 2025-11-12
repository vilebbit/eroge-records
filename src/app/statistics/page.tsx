import { Suspense } from "react"
import { Skeleton } from "@heroui/skeleton"
import { cacheLife } from "next/cache"
import { queryAllGames } from "@/lib/db"
import { Statistics } from "./statistics"

// const LIMIT_RECENT_GAMES = 6

export default async function StatisticsPage() {
  "use cache"
  cacheLife("days")

  const gamePromise = queryAllGames()

  return (
    <div className="w-full">
      <Suspense
        fallback={
          <div className="w-full">
            <Skeleton className="w-64 h-10 mb-8 rounded" />
            {/* <div className="mb-12">
              <Skeleton className="w-48 h-8 mb-6 rounded" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {Array.from({ length: LIMIT_RECENT_GAMES }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="w-full aspect-3/4 rounded-lg" />
                    <Skeleton className="w-3/4 h-4 rounded" />
                    <Skeleton className="w-1/2 h-6 rounded-full" />
                  </div>
                ))}
              </div>
            </div> */}
            <div className="mb-12">
              <Skeleton className="w-56 h-8 mb-6 rounded" />
              <div className="bg-content1 rounded-lg p-6 border border-default-200">
                <Skeleton className="w-full h-[600px] rounded-lg" />
              </div>
            </div>
          </div>
        }
      >
        <Statistics gamesPromise={gamePromise} />
      </Suspense>
    </div>
  )
}
