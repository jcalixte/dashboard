import { NpmRange } from '@/models/NpmRange'

const NPM_URL = 'https://api.npmjs.org/downloads/range/'

const url = (pkg: string) => {
  return `${NPM_URL}${pkg}`
}

export const fetchMonthPackage = async (pkg: string): Promise<NpmRange> => {
  const response = await fetch(url(`last-month/${pkg}`))
  return (await response.json()) ?? null
}

export const fetchWeekPackage = async (pkg: string): Promise<NpmRange> => {
  const response = await fetch(url(`last-week/${pkg}`))
  return (await response.json()) ?? null
}
