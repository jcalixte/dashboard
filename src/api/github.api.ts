import { GithubRepo } from '@/models/GithubRepo'

const GITHUB_URL = 'https://api.github.com/repos/jcalixte/'

const url = (repo: string) => `${GITHUB_URL}${repo}`

export const fetchRepo = async (repo: string): Promise<GithubRepo> => {
  const response = await fetch(url(repo))
  return await response.json()
}
