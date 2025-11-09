import "server-only"

import type { GameCollectionDoc, GameDoc } from "./documents"

interface Selector {
  [key: string]: string | number | Selector
}

interface MangoQuery {
  "selector": Selector,
  "fields"?: string[],
  "sort"?: { [key: string]: "asc" | "desc" }[]
}

export async function findDB<T extends "vnite-game" | "vnite-game-collection">(
  db: T,
  query: MangoQuery,
): Promise<T extends "vnite-game" ? GameDoc[] : GameCollectionDoc[]> {
  const url = new URL(`/${db}/_find`, process.env.COUCH_HOST)
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${process.env.COUCH_USER}:${process.env.COUCH_PASS}`),
      "Content-Type": "application/json",
      "Accept-Encoding": "br, gzip, deflate",
    },
    body: JSON.stringify(query),
  })
  const resj = await resp.json()
  if (resj.docs) {
    return resj.docs
  }
  throw new Error(`db query error: ${resj}`)
}
