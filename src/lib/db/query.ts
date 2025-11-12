"use server"
import "server-only"

import { cacheLife } from "next/cache"
import { findDB } from "./couch"
import type { GameCollectionDoc, GameDoc } from "./documents"

export async function queryAllGames(): Promise<GameDoc[]> {
  "use cache"
  cacheLife("days")

  try {
    const games = await findDB("vnite-game", {
      selector: { "$not": { "_id": { "$beginsWith": "_design/" } } },
      fields: [
        "_id",
        "metadata.name",
        "metadata.releaseDate",
        "metadata.developers",
        "metadata.relatedSites",
        "metadata.erogamescapeId",
        "metadata.genres",
        "record.lastRunDate",
        "record.score",
        "record.playTime",
        "record.playStatus",
      ],
      limit: 9999,
    })
    return games
  } catch (error) {
    console.error("queryAllGames failed: ", error)
    return []
  }
}

export async function queryCollections(): Promise<GameCollectionDoc[]> {
  "use cache"
  cacheLife("days")

  try {
    const collections = await findDB("vnite-game-collection", {
      selector: { "$not": { "_id": { "$beginsWith": "_design/" } } },
      fields: [
        "_id",
        "name",
        "games",
      ],
      limit: 9999,
    })
    return collections
  } catch (error) {
    console.error("queryCollections failed: ", error)
    return []
  }
}

// export async function queryAllGamesSortByScore(): Promise<GameDoc[]> {
//   "use cache"
//   cacheLife("hours")

//   try {
//     const games = await findDB("vnite-game", {
//       selector: {},
//       fields: ["_id", "metadata", "record"],
//       sort: [{ "record.score": "desc" }, { "record.lastRunDate": "desc" }],
//     })
//     return games
//   } catch (error) {
//     console.error("queryAllGamesSortByScore failed: ", error)
//     return []
//   }
// }

// export async function queryRecentGames(): Promise<GameDoc[]> {
//   "use cache"
//   cacheLife("hours")

//   const afterDate = new Date()
//   afterDate.setFullYear(afterDate.getFullYear() - 1)

//   try {
//     const games = await findDB("vnite-game", {
//       selector: { "record.lastRunDate": { $gte: afterDate.toISOString() } },
//       fields: ["_id", "metadata", "record"],
//       sort: [{ "record.lastRunDate": "desc" }],
//     })
//     return games
//   } catch (error) {
//     console.error("queryRecentGames failed: ", error)
//     return []
//   }
// }
