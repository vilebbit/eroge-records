"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { useTranslation } from "react-i18next"
import { formatPlaytime, formatPlaytimeDecimal } from "@/lib/utils/time"
import { getGameTitle } from "@/lib/utils/gameData"
import type { GameDoc } from "@/lib/db/documents"

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

  // Sort by playtime and take top N games
  const sortedGames = games
    .sort((a, b) => b.record.playTime - a.record.playTime)
    .slice(0, maxGames)

  // Prepare data for chart
  const chartData: ChartData[] = sortedGames.map((game) => ({
    name: getGameTitle(game),
    playtime: formatPlaytimeDecimal(game.record.playTime),
    playtimeFormatted: formatPlaytime(game.record.playTime),
  }))

  if (chartData.length === 0) {
    return (
      <div className="text-center py-12 text-default-400">
        {t("statistics.noPlaytimeData")}
      </div>
    )
  }

  // Generate gradient colors
  const getColor = (index: number, total: number) => {
    const hue = 220 - (index / total) * 20
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
          <CartesianGrid horizontal={false} strokeDasharray="3 3" className="stroke-default-200" />
          <XAxis
            type="number"
            tickLine={false}
            tick={{ fill: "hsl(var(--coffee-default-500))" }}
            label={{
              value: t("common.hours"),
              position: "insideBottom",
              offset: -10,
              fill: "hsl(var(--coffee-default-700))",
            }}
            className="text-xs"
          />
          <YAxis
            type="category"
            dataKey="name"
            tickLine={false}
            width={40}
            className="text-xs"
            tickFormatter={(value) => {
              const sanitized = value.replace(" ", "")
              return sanitized.length >= 14
                ? `${sanitized.slice(0, 14)}…`
                : sanitized
            }}
            tick={{ fill: "hsl(var(--coffee-default-700))" }}
          />
          <Tooltip
            animationDuration={300}
            animationEasing="ease-out"
            cursor={{ fill: "hsl(var(--coffee-default-200))" }}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-content1 border border-default-200 rounded-lg p-3 shadow-lg">
                    <p className="font-semibold text-sm mb-1">{payload[0].payload.name}</p>
                    <p className="text-sm text-default-500">
                      {t("ratingTable.columns.playtime")}: {payload[0].payload.playtimeFormatted}
                    </p>
                  </div>
                )
              }
              return null
            }}
          />
          <Bar dataKey="playtime" radius={[0, 4, 4, 0]} activeBar={false}>
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={getColor(index, chartData.length)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
