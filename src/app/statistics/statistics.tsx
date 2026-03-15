"use client"

import { use } from "react"
import { useTranslation } from "react-i18next"
import { useRouter, useSearchParams } from "next/navigation"
import { PlaytimeChart } from "@/components/features/playtimeChart"
import YearSelector from "@/components/yearSelector"
import type { GameDoc } from "@/lib/db/documents"
import { getYearGames } from "@/lib/utils/filters"

export function Statistics({
  gamesPromise,
}: {
  gamesPromise: Promise<GameDoc[]>,
}) {
  const { t } = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()

  const games = use(gamesPromise)

  // Get selected year from URL or default to undefined (recent 1 year)
  const yearParam = searchParams.get("y")
  let selectedYear = yearParam ? parseInt(yearParam) : undefined

  // Validate selected year against available years
  if (selectedYear) {
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: currentYear - 2013 + 1 }, (_, i) => currentYear - i)
    if (!years.includes(selectedYear)) {
      selectedYear = undefined
    }
  }

  // Get games for selected year
  const yearGames = getYearGames(games, selectedYear === undefined ? 0 : selectedYear)

  // Handle year selection change
  const handleYearChange = (year: number | undefined) => {
    const params = new URLSearchParams(searchParams.toString())
    if (year === undefined) {
      params.delete("y")
    } else {
      params.set("y", year.toString())
    }
    router.replace(`?${params.toString()}`)
  }

  // Determine chart title based on selected year
  const getChartTitle = () => {
    if (!selectedYear) {
      return t("statistics.lastOneYearPlaytimeChartTitle")
    }
    return t("statistics.yearPlaytimeChartTitle", { year: selectedYear })
  }

  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{t("statistics.title")}</h1>
      </div>

      <YearSelector
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />

      <div>
        <h2 className="text-xl mb-8">{getChartTitle()}</h2>
        <PlaytimeChart games={yearGames} />
      </div>
    </div>
  )
}
