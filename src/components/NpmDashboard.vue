<template>
  <div class="npm-dashboard">
    <h2>{{ name }}</h2>
    <p>
      <a :href="result.npmUrl" rel="noopener" target="_blank">npm</a>
      &nbsp;
      <a :href="result.githubUrl" rel="noopener" target="_blank">GitHub</a>
    </p>
    <table>
      <tr>
        <th>jour</th>
        <th>semaine</th>
        <th>mois</th>
        <th>
          <img src="@/assets/star.svg" alt="stars" />
        </th>
        <th v-if="result.issues">
          <img src="@/assets/issue.svg" alt="issues" />
        </th>
      </tr>
      <tr>
        <td>
          <number
            :from="0"
            :to="result.totalDay"
            :duration="1"
            easing="Power1.easeOut"
          />
        </td>
        <td>
          <number
            :from="0"
            :to="result.totalWeek"
            :duration="1"
            easing="Power1.easeOut"
          />
        </td>
        <td>
          <number
            :from="0"
            :to="result.totalMonth"
            :duration="1"
            easing="Power1.easeOut"
          />
        </td>
        <td>
          <number
            :from="0"
            :to="result.stars"
            :duration="1"
            easing="Power1.easeOut"
          />
        </td>
        <td v-if="result.issues">
          <number
            :from="0"
            :to="result.issues"
            :duration="1"
            easing="Power1.easeOut"
          />
        </td>
      </tr>
    </table>

    <div class="graph">
      <svg :viewBox="`0 0 ${graphSize} 100`">
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
  components: {},
  props: {
    name: { type: String, required: true },
    result: { type: Object as PropType<PkgResult>, required: true }
  },
  setup(props) {
    const { points, graphSize } = useGraph(props.result.lastMonth)

    return {
      graphPoints: points,
      graphSize
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
      padding: 0.2rem 1rem;
    }
  }

  .graph {
    svg {
      width: 100px;

      polyline {
        fill: none;
        stroke: #43cfcb;
        stroke-width: 2;
        text-align: center;
      }
    }
  }
}
</style>
