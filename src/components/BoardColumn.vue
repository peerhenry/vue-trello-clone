<template lang="pug">
.column(
  draggable
  @drop="dropTaskOrColumn($event, { toTasks: column.tasks, toColumnIndex: columnIndex })"
  @dragover.prevent
  @dragenter.prevent
  @dragstart.self="pickupColumn($event, columnIndex)"
  )
  .flex.items-center.mb-2.font-bold {{ column.name }}
  div
    BoardTask(
      v-for="(task, taskIndex) in column.tasks"
      :key="`col-${taskIndex}`"
      :task="task"
      :taskIndex="taskIndex"
      :column="column"
      :columnIndex="columnIndex"
      :board="board"
      )
  input.block.p-2.w-full.bg-transparent(
    type="text"
    placeholder="+ Enter new task"
    @keyup.enter="createTask($event, column.tasks)"
    )
</template>

<script>
import BoardTask from '@/components/BoardTask'
import moveTasksAndColumnsMixin from '@/mixins/movingTasksAndColumnsMixin.js'

export default {
  mixins: [moveTasksAndColumnsMixin],
  components: { BoardTask },
  methods: {
    createTask(e, tasks) {
      this.$store.commit('CREATE_TASK', {
        tasks,
        name: e.target.value,
      })
      e.target.value = ''
    },
    pickupColumn(e, colIndex) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('from-column-index', colIndex)
      e.dataTransfer.setData('drag-type', 'column')
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

<style scoped lang="stylus">
.column
  @apply bg-grey-300 p-2 mr-4 text-left shadow rounded
  min-width 350px
</style>
