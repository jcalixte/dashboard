import { NpmRange } from '@/models/NpmRange'

const NPM_URL = 'https://api.npmjs.org/downloads/range/'

const url = (pkg: string) => `${NPM_URL}${pkg}`

const fetchMonthPackage = async (pkg: string): Promise<NpmRange> => {
  const response = await fetch(url(`last-month/${pkg}`))
  return (await response.json()) ?? null
}

const fetchWeekPackage = async (pkg: string): Promise<NpmRange> => {
  const response = await fetch(url(`last-week/${pkg}`))
  return (await response.json()) ?? null
}

const fetchDayPackage = async (pkg: string): Promise<NpmRange> => {
  const response = await fetch(url(`last-day/${pkg}`))
  return (await response.json()) ?? null
}

export const fetchAllPackage = (
  pkg: string
): [Promise<NpmRange>, Promise<NpmRange>, Promise<NpmRange>] => {
  return [fetchDayPackage(pkg), fetchWeekPackage(pkg), fetchMonthPackage(pkg)]
}
