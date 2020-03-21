<template lang="pug">
AppDrop(@dropped="dropIt")
  AppDrag.task(
    :transferData="{ dragType: 'task', fromColumnIndex: columnIndex, taskIndex: taskIndex }"
    @click="openTask(task)")
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
    dropIt(transferData) {
      this.dropTaskOrColumn(transferData, {
        toTasks: this.column.tasks,
        toColumnIndex: this.columnIndex,
        toTaskIndex: this.taskIndex,
      })
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
