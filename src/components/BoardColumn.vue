<template lang="pug">
AppDrop(@dropped="dropOnColumn")
  AppDrag.column(:transferData="{ dragType: 'column', fromColumnIndex: columnIndex }")
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
    dropOnColumn(transferData) {
      this.dropTaskOrColumn(transferData, {
        toColumnIndex: this.columnIndex,
        toTasks: this.column.tasks,
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
