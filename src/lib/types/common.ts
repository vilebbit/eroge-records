import type { GameDoc } from "@/lib/db/documents"

export type PlayStatus = "unplayed" | "playing" | "partial" | "finished" | "multiple" | "shelved"

export interface PlayStatusConfig {
  key: PlayStatus
  label: string
  color: "default" | "primary" | "secondary" | "success" | "warning" | "danger"
}

export const PLAY_STATUS_CONFIG: Record<PlayStatus, PlayStatusConfig> = {
  unplayed: { key: "unplayed", label: "Unplayed", color: "default" },
  playing: { key: "playing", label: "Playing", color: "primary" },
  partial: { key: "partial", label: "Partial", color: "warning" },
  finished: { key: "finished", label: "Finished", color: "success" },
  multiple: { key: "multiple", label: "Multiple", color: "secondary" },
  shelved: { key: "shelved", label: "Shelved", color: "danger" },
}

export type ScoreRange = "10.0" | "9.0-9.9" | "8.0-8.9" | "7.0-7.9" | "6.0-6.9" | "<6.0"

export interface ScoreRangeGroup {
  range: ScoreRange
  label: string
  games: GameDoc[]
}

export interface GameCardData {
  id: string
  title: string
  coverUrl: string | null
  officialSiteUrl: string | null
  playStatus: PlayStatus
  score: number
  playTime: number
  lastRunDate: string
}
