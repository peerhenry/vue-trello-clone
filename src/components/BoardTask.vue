<template lang="pug">
.task(
  draggable
  @dragstart="pickupTask($event, taskIndex, columnIndex)"
  @click="openTask(task)"
  @dragover.prevent
  @dragenter.prevent
  @drop.stop="dropTaskOrColumn($event, { toTasks: column.tasks, toColumnIndex: columnIndex, toTaskIndex: taskIndex })"
  )
  template(v-if="task")
    span.w-full.flex-shrink-0.font-bold {{ task.name }}
    span.w-full.flex-shrink-0.mt-1.text-sm(v-if="task.description") {{ task.description }}
  span(v-else) NOTHING
</template>

<script>
import moveTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin.js'

export default {
  mixins: [moveTasksAndColumnsMixin],
  props: {
    task: {
      type: Object,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    openTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    pickupTask(e, taskIndex, fromColIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColIndex)
      e.dataTransfer.setData('drag-type', 'task')
    },
  },
}
</script>

<style lang="stylus">
.task
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline

.task.drag
  @apply bg-red-500
</style>
