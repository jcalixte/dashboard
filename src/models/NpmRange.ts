export interface NpmDownload {
  downloads: number
  day: string
}

export interface NpmRange {
  start: string
  end: string
  package: string
  downloads: NpmDownload[]
}
