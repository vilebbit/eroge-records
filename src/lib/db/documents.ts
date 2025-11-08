export declare interface GameDoc {
  _id: string
  metadata: {
    name: string
    originalName: string
    sortName: string
    releaseDate: string
    description: string
    developers: string[]
    publishers: string[]
    platforms: string[]
    genres: string[]
    tags: string[]
    relatedSites: {
      label: string
      url: string
    }[]
    steamId: string
    vndbId: string
    igdbId: string
    ymgalId: string
    extra: {
      key: string
      value: string[]
    }[]
  }
  record: {
    addDate: string
    lastRunDate: string
    score: number
    playTime: number
    playStatus: "unplayed" | "playing" | "partial" | "finished" | "multiple" | "shelved"
    timers: {
      start: string
      end: string
    }[]
  }
}

export declare interface GameCollectionDoc {
  _id: string
  name: string
  games: string[]
}
