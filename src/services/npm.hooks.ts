import { fetchMonthPackage, fetchWeekPackage } from '@/api/npm.api'
import { NpmRange } from '@/models/NpmRange'
import { reactive, toRefs } from '@vue/composition-api'

export interface PkgResult {
  totalMonth: number
  totalWeek: number
  lastMonth: number[]
}

interface NpmResult {
  pwa: PkgResult | null
  onlineOffline: PkgResult | null
}

const toPkgResult = (pkgWeek: NpmRange, pkgMonth: NpmRange): PkgResult => ({
  totalWeek: pkgWeek.downloads.reduce((a, b) => a + b.downloads, 0),
  totalMonth: pkgMonth.downloads.reduce((a, b) => a + b.downloads, 0),
  lastMonth: pkgMonth.downloads.map(({ downloads }) => downloads)
})

export const useNpm = () => {
  const state = reactive<NpmResult>({
    pwa: null,
    onlineOffline: null
  })

  const init = async () => {
    const pwaWeekPkg = await fetchWeekPackage('vue-pwa-asset-generator')
    const pwaMonthPkg = await fetchMonthPackage('vue-pwa-asset-generator')
    const onlineWeekPkg = await fetchWeekPackage('vue-online-offline')
    const onlineMonthPkg = await fetchMonthPackage('vue-online-offline')

    state.pwa = toPkgResult(pwaWeekPkg, pwaMonthPkg)
    state.onlineOffline = toPkgResult(onlineWeekPkg, onlineMonthPkg)
  }

  return {
    ...toRefs(state),
    init
  }
}
