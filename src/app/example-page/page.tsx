import { ExamplePageComponent } from "./component"
import { Suspense } from "react"
import { Chip } from "@heroui/chip"
import { Code } from "@heroui/code"
import { cacheLife } from "next/cache"
import { queryRecentGames } from "@/lib/db"

export default async function ExamplePage() {
  "use cache"
  cacheLife("minutes")

  const mockData = queryRecentGames()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Example Page</h1>
      <p>This is an example page to demonstrate layout and data fetching.</p>
      <div><Chip>Chip3</Chip></div>
      <div>
        <Code>npm run xxx</Code>
      </div>
      <Suspense fallback={<div>Loading component...</div>}>
        <ExamplePageComponent dataPromise={mockData} />
      </Suspense>
    </div>
  )
}
