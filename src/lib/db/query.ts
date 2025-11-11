"use server"
import "server-only"

import { cacheLife } from "next/cache"
import { findDB } from "./couch"
import type { GameDoc } from "./documents"

export async function queryAllGames(): Promise<GameDoc[]> {
  "use cache"
  cacheLife("hours")

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
