"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { useTranslation } from "react-i18next"
import { GameDoc } from "@/lib/db/documents"
import { formatPlaytime, formatPlaytimeDecimal } from "@/lib/utils/time"
import { getGameTitle } from "@/lib/utils/gameData"
import { useEffect, useState } from "react"

interface PlaytimeChartProps {
  games: GameDoc[]
  maxGames?: number
}

interface ChartData {
  name: string
  playtime: number
  playtimeFormatted: string
}

export function PlaytimeChart({ games, maxGames = 25 }: PlaytimeChartProps) {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sort by playtime and take top N games
  const sortedGames = [...games]
    .sort((a, b) => b.record.playTime - a.record.playTime)
    .slice(0, maxGames)

  // Prepare data for chart
  const chartData: ChartData[] = sortedGames.map((game) => ({
    name: getGameTitle(game),
    playtime: formatPlaytimeDecimal(game.record.playTime),
    playtimeFormatted: formatPlaytime(game.record.playTime),
  }))

  if (!mounted) {
    return (
      <div className="w-full h-[600px] bg-default-100 animate-pulse rounded-lg" />
    )
  }

  if (chartData.length === 0) {
    return (
      <div className="text-center py-12 text-default-400">
        {t("statistics.noPlaytimeData")}
      </div>
    )
  }

  // Generate gradient colors
  const getColor = (index: number, total: number) => {
    const hue = 200 + (index / total) * 60
    return `hsl(${hue}, 70%, 50%)`
  }

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={Math.max(400, chartData.length * 35)}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 150, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-default-200" />
          <XAxis
            type="number"
            label={{ value: t("common.hours"), position: "insideBottom", offset: -10 }}
            className="text-xs"
          />
          <YAxis
            type="category"
            dataKey="name"
            width={140}
            className="text-xs"
            tick={{ fontSize: 11 }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-content1 border border-default-200 rounded-lg p-3 shadow-lg">
                    <p className="font-semibold text-sm mb-1">{payload[0].payload.name}</p>
                    <p className="text-primary text-sm">
                      {t("ratingTable.columns.playtime")}: {payload[0].payload.playtimeFormatted}
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="playtime" radius={[0, 4, 4, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(index, chartData.length)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
