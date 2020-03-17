<template lang="pug">
.board
  .flex.flex-row.items-start
    .column(v-for="(column, ci) of board.columns" :key="`col-${ci}`")
      .flex.items-center.mb-2.font-bold {{ column.name }}
      div
        .task(
          v-for="(task, ti) in column.tasks"
          :key="`col-${ti}`"
          @click="openTask(task)"
          )
          span.w-full.flex-shrink-0.font-bold {{ task.name }}
          span.w-full.flex-shrink-0.mt-1.text-sm(v-if="task.description") {{ task.description }}

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
