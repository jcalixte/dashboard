import { fetchMonthPackage, fetchWeekPackage } from '@/api/npm.api'
import { NpmRange } from '@/models/NpmRange'
import { reactive, toRefs } from '@vue/composition-api'
import { fetchRepo } from '@/api/github.api'

export interface PkgResult {
  totalMonth: number
  totalWeek: number
  lastMonth: number[]
  stars: number
}

interface NpmResult {
  pwa: PkgResult | null
  onlineOffline: PkgResult | null
}

const toPkgResult = (
  pkgWeek: NpmRange,
  pkgMonth: NpmRange,
  stars: number
): PkgResult => ({
  totalWeek: pkgWeek.downloads.reduce((a, b) => a + b.downloads, 0),
  totalMonth: pkgMonth.downloads.reduce((a, b) => a + b.downloads, 0),
  lastMonth: pkgMonth.downloads.map(({ downloads }) => downloads),
  stars
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

    state.pwa = toPkgResult(pwaWeekPkg, pwaMonthPkg, pwaRepo.stargazers_count)
    state.onlineOffline = toPkgResult(
      onlineWeekPkg,
      onlineMonthPkg,
      onlineRepo.stargazers_count
    )
  }

  return {
    ...toRefs(state),
    init
  }
}
