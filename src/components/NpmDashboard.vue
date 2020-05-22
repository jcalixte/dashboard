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
        <th>semaine</th>
        <th>mois</th>
        <th>
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="none"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            ></polygon>
          </svg>
        </th>
        <th v-if="result.issues">
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
            ></path>
          </svg>
        </th>
      </tr>
      <tr>
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
  components: {},
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
      padding: 0.2rem 1rem;
    }
  }

  .graph {
    svg {
      width: 100px;
      height: 100px;

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
