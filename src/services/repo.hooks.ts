import { fetchAllPackage } from '@/api/npm.api'
import { NpmRange } from '@/models/NpmRange'
import { reactive, toRefs } from '@vue/composition-api'
import { fetchRepo } from '@/api/github.api'
import { GithubRepo } from '@/models/GithubRepo'

export interface PkgResult {
  totalMonth: number
  totalWeek: number
  totalDay: number
  lastMonth: number[]
  stars: number
  issues: number
  npmUrl: string
  githubUrl: string
}

interface NpmResult {
  pwa: PkgResult | null
  onlineOffline: PkgResult | null
  retrobus: PkgResult | null
}

const toPkgResult = (
  pkgDay: NpmRange,
  pkgWeek: NpmRange,
  pkgMonth: NpmRange,
  repo: GithubRepo
): PkgResult => ({
  totalDay: pkgDay?.downloads?.reduce((a, b) => a + b.downloads, 0) ?? 0,
  totalWeek: pkgWeek?.downloads?.reduce((a, b) => a + b.downloads, 0) ?? 0,
  totalMonth: pkgMonth?.downloads?.reduce((a, b) => a + b.downloads, 0) ?? 0,
  lastMonth: pkgMonth?.downloads?.map(({ downloads }) => downloads) ?? [],
  stars: repo.stargazers_count,
  issues: repo.open_issues_count,
  npmUrl: `https://www.npmjs.com/package/${pkgWeek.package}`,
  githubUrl: repo.html_url
})

export const useRepo = () => {
  const state = reactive<NpmResult>({
    pwa: null,
    onlineOffline: null,
    retrobus: null
  })

  const init = async () => {
    const pwa = 'vue-pwa-asset-generator'
    const onlineOffline = 'vue-online-offline'
    const retrobus = 'retrobus'
    const packages = [pwa, onlineOffline, retrobus]

    const [
      pwaDayPkg,
      pwaWeekPkg,
      pwaMonthPkg,
      onlineDayPkg,
      onlineWeekPkg,
      onlineMonthPkg,
      retrobusDayPkg,
      retrobusWeekPkg,
      retrobusMonthPkg
    ] = await Promise.all(packages.flatMap((pkg) => fetchAllPackage(pkg)))

    const [pwaRepo, onlineRepo, retrobusRepo] = await Promise.all(
      packages.map((pkg) => fetchRepo(pkg))
    )

    state.pwa = toPkgResult(pwaDayPkg, pwaWeekPkg, pwaMonthPkg, pwaRepo)
    state.onlineOffline = toPkgResult(
      onlineDayPkg,
      onlineWeekPkg,
      onlineMonthPkg,
      onlineRepo
    )
    state.retrobus = toPkgResult(
      retrobusDayPkg,
      retrobusWeekPkg,
      retrobusMonthPkg,
      retrobusRepo
    )
  }

  return {
    ...toRefs(state),
    init
  }
}
