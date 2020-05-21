<template>
  <div class="home-page">
    <Dashboard />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Dashboard from '@/components/Dashboard.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    Dashboard
  }
})
</script>
