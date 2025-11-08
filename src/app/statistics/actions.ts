"use server"

import { queryRecentGames } from "@/lib/db/query"

export async function getRecentGames() {
  return await queryRecentGames()
}
