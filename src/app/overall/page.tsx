import { Skeleton } from "@heroui/skeleton"
import { cacheLife } from "next/cache"
import { queryAllGames } from "@/lib/db"
import { Suspense } from "react"
import { Overall } from "./overall"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Overall",
}

export default async function OverallPage() {
  "use cache"
  cacheLife("days")

  const gamePromise = queryAllGames()

  return (
    <Suspense
      fallback={
        <div className="w-full">
          <Skeleton className="w-80 h-10 mb-8 rounded" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="mb-8">
              <Skeleton className="w-48 h-8 mb-4 rounded" />
              <Skeleton className="w-full h-96 rounded-lg" />
            </div>
          ))}
        </div>
      }
    >
      <Overall gamesPromise={gamePromise} />
    </Suspense>
  )
}
