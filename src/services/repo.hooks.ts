import { fetchMonthPackage, fetchWeekPackage } from '@/api/npm.api'
import { NpmRange } from '@/models/NpmRange'
import { reactive, toRefs } from '@vue/composition-api'
import { fetchRepo } from '@/api/github.api'
import { GithubRepo } from '@/models/GithubRepo'

export interface PkgResult {
  totalMonth: number
  totalWeek: number
  lastMonth: number[]
  stars: number
  issues: number
  npmUrl: string
  githubUrl: string
}

interface NpmResult {
  pwa: PkgResult | null
  onlineOffline: PkgResult | null
}

const toPkgResult = (
  pkgWeek: NpmRange,
  pkgMonth: NpmRange,
  repo: GithubRepo
): PkgResult => ({
  totalWeek: pkgWeek.downloads.reduce((a, b) => a + b.downloads, 0),
  totalMonth: pkgMonth.downloads.reduce((a, b) => a + b.downloads, 0),
  lastMonth: pkgMonth.downloads.map(({ downloads }) => downloads),
  stars: repo.stargazers_count,
  issues: repo.open_issues_count,
  npmUrl: `https://www.npmjs.com/package/${pkgWeek.package}`,
  githubUrl: repo.html_url
})

export const useRepo = () => {
  const state = reactive<NpmResult>({
    pwa: null,
    onlineOffline: null
  })

  const init = async () => {
    const pwa = 'vue-pwa-asset-generator'
    const onlineOffline = 'vue-online-offline'
    const [
      pwaWeekPkg,
      pwaMonthPkg,
      pwaRepo,
      onlineWeekPkg,
      onlineMonthPkg,
      onlineRepo
    ] = await Promise.all([
      fetchWeekPackage(pwa),
      fetchMonthPackage(pwa),
      fetchRepo(pwa),
      fetchWeekPackage(onlineOffline),
      fetchMonthPackage(onlineOffline),
      fetchRepo(onlineOffline)
    ])

    state.pwa = toPkgResult(pwaWeekPkg, pwaMonthPkg, pwaRepo)
    state.onlineOffline = toPkgResult(onlineWeekPkg, onlineMonthPkg, onlineRepo)
  }

  return {
    ...toRefs(state),
    init
  }
}
