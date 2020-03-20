<template lang="pug">
.board
  .flex.flex-row.items-start
    .column(
      v-for="(column, colIndex) of board.columns"
      :key="`col-${colIndex}`"
      draggable
      @drop="dropTaskOrColumn($event, column.tasks, colIndex)"
      @dragover.prevent
      @dragenter.prevent
      @dragstart.self="pickupColumn($event, colIndex)"
      )
      .flex.items-center.mb-2.font-bold {{ column.name }}
      div
        .task(
          v-for="(task, taskIndex) in column.tasks"
          :key="`col-${taskIndex}`"
          draggable
          @dragstart="pickupTask($event, taskIndex, colIndex)"
          @click="openTask(task)"
          )
          span.w-full.flex-shrink-0.font-bold {{ task.name }}
          span.w-full.flex-shrink-0.mt-1.text-sm(v-if="task.description") {{ task.description }}
      input.block.p-2.w-full.bg-transparent(
        type="text"
        placeholder="+ Enter new task"
        @keyup.enter="createTask($event, column.tasks)"
        )

  .task-bg(
    v-if="isTaskOpen"
    @click.self="close"
    )
    router-view
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Board',
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task'
    },
  },
  methods: {
    openTask(task) {
      this.$router.push({ name: 'task', params: { id: task.id } })
    },
    close() {
      this.$router.push({ name: 'board' })
    },
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value,
      })
      e.target.value = ''
    },
    pickupTask(e, taskIndex, fromColIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('task-index', taskIndex)
      e.dataTransfer.setData('from-column-index', fromColIndex)
      e.dataTransfer.setData('drag-type', 'task')
    },
    dropTask(e, toTasks) {
      const taskIndex = e.dataTransfer.getData('task-index')
      const fromColIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColIndex].tasks
      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        taskIndex,
      })
    },
    pickupColumn(e, colIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('from-column-index', colIndex)
      e.dataTransfer.setData('drag-type', 'column')
    },
    dropTaskOrColumn(e, totTasks, toColumnIndex) {
      const dragType = e.dataTransfer.getData('drag-type')
      if (dragType === 'task') this.dropTask(e, totTasks)
      else this.moveColumn(e, toColumnIndex)
    },
    moveColumn(e, toColumnIndex) {
      const fromColumnIndex = e.dataTransfer.getData('from-column-index')
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex,
      })
    },
  },
}
</script>

<style lang="stylus">
.task
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline

.column
  @apply bg-grey-300 p-2 mr-4 text-left shadow rounded
  min-width 350px

.board
  @apply p-4 bg-teal-500 h-full overflow-auto

.task-bg
  @apply inset-0 absolute
  background rgba(0, 0, 0, 0.5)
</style>
