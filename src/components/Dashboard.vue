<template>
  <div class="dashboard">
    <section class="section">
      <section v-if="pwa">
        <NpmDashboard name="Vue PWA asset generator" :result="pwa" />
      </section>
      <section v-if="retrobus">
        <NpmDashboard name="Retrobus" :result="retrobus" />
      </section>
      <section v-if="onlineOffline">
        <NpmDashboard name="Vue Online Offline" :result="onlineOffline" />
      </section>
    </section>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useRepo } from '@/services/repo.hooks'

export default defineComponent({
  name: 'DashBoard',
  components: {
    NpmDashboard: () => import('@/components/NpmDashboard.vue')
  },
  setup() {
    const { pwa, onlineOffline, retrobus, init } = useRepo()
    init()

    return {
      pwa,
      onlineOffline,
      retrobus
    }
  }
})
</script>

<style scoped lang="scss">
.dashboard {
  text-align: center;
  .section {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 2rem;
  }
}
</style>
