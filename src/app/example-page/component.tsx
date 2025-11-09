"use client"

import { use } from "react"
import { Button, Chip } from "@heroui/react"
import { GameDoc } from "@/lib/db"
import { useClient } from "@/lib/hook/useClient"
import { useLocalStorage } from "usehooks-ts"

export function ExamplePageComponent({
  dataPromise,
}: Readonly<{
  dataPromise: Promise<GameDoc[]>,
}>,
) {
  const isClient = useClient()
  const [value, setValue] = useLocalStorage("test-value-key", 0, { initializeWithValue: false })

  const data = use(dataPromise)
  return (
    <div className="p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
        Example Page Component
      </h2>
      <div><Chip>Chip4</Chip></div>
      <div>
        <Button onPress={() => { setValue(prev => prev + 1) }}>
          click me
        </Button>
      </div>
      <div>Value in local storage: {value}</div>
      <p className="text-gray-700 dark:text-gray-300">
        This is an example component inside the example-page route.
      </p>
      {
        isClient
          ? data.map((game) => (
            <div key={game._id}>
              <h3>
                {game.metadata.name || "Untitled Game"}
              </h3>
              <p>
                Score: {game.record.score} | Last Run: {new Date(game.record.lastRunDate).toLocaleDateString()}
              </p>
            </div>
          ))
          : null
      }
    </div>
  )
}
