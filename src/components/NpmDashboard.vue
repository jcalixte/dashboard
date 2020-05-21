<template>
  <div class="npm-dashboard">
    <h2>{{ name }}</h2>
    <table>
      <tr>
        <th>mois</th>
        <th>semaine</th>
        <th>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="css-i6dzq1"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            ></polygon>
          </svg>
        </th>
      </tr>
      <tr>
        <td>{{ result.totalMonth }}</td>
        <td>{{ result.totalWeek }}</td>
        <td>{{ result.stars }}</td>
      </tr>
    </table>

    <div class="graph">
      <svg viewBox="0 0 100 100">
        <polyline :points="graphPoints" />
      </svg>
    </div>
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

  .graph {
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
}
</style>
