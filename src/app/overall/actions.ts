"use server"

import { queryAllGamesSortByScore } from "@/lib/db/query"

export async function getAllGamesSortByScore() {
  return await queryAllGamesSortByScore()
}
