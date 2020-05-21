import { ref } from '@vue/composition-api'

export const useGraph = (points: number[]) => {
  const max = Math.max(...points) + 15
  const abs = Array.from({ length: points.length }, (_, index) =>
    Math.floor((index / points.length) * 100)
  )
  const graphPoints = points.map((point, index) => ({
    y: max - point,
    x: abs[index]
  }))

  return ref(graphPoints.map(({ x, y }) => `${x},${y}`).join(' '))
}
