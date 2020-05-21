<template>
  <div class="npm-dashboard">
    <h2>{{ name }} ({{ result.stars }} étoiles)</h2>
    <table>
      <tr>
        <th>mois</th>
        <th>semaine</th>
      </tr>
      <tr>
        <td>{{ result.totalMonth }}</td>
        <td>{{ result.totalWeek }}</td>
      </tr>
    </table>

    <svg viewBox="0 0 100 100">
      <polyline :points="graphPoints" />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { PkgResult } from '@/services/repo.hooks'
import { useGraph } from '@/services/graph.hooks'

export default defineComponent({
  name: 'NpmDashBoard',
  props: {
    name: { type: String, required: true },
    result: { type: Object as PropType<PkgResult>, required: true }
  },
  setup(props) {
    const graphPoints = useGraph(props.result.lastMonth)

    return {
      graphPoints
    }
  }
})
</script>

<style scoped lang="scss">
.npm-dashboard {
  text-align: center;

  table {
    margin: auto;

    th,
    td {
      padding: 5px;
    }
  }

  svg {
    width: 100px;
    height: 100px;

    polyline {
      fill: none;
      stroke: green;
      stroke-width: 2;
      text-align: center;
    }
  }
}
</style>
