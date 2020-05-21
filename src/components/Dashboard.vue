<template>
  <div class="dashboard">
    <h1>NPM</h1>
    <section class="section">
      <section v-if="pwa">
        <NpmDashboard name="Vue PWA asset generator" :result="pwa" />
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
    const { pwa, onlineOffline, init } = useRepo()
    init()

    return {
      pwa,
      onlineOffline
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
