<template lang="pug">
.board
  .flex.flex-row.items-start
    BoardColumn(
      v-for="(column, colIndex) of board.columns"
      :key="`col-${colIndex}`"
      :column="column"
      :columnIndex="colIndex"
      :board="board"
    )

    .column.flex
      input.p-2.mr-2.flex-grow(
        type="text"
        v-model="newColumnName"
        placeholder="New Column Name"
        @keyup.enter="createColumn"
        )

  .task-bg(
    v-if="isTaskOpen"
    @click.self="close"
    )
    router-view
</template>

<script>
import { mapState } from 'vuex'
import BoardColumn from '@/components/BoardColumn.vue'

export default {
  name: 'Board',
  components: { BoardColumn },
  data() {
    return {
      newColumnName: '',
    }
  },
  computed: {
    ...mapState(['board']),
    isTaskOpen() {
      return this.$route.name === 'task'
    },
  },
  methods: {
    close() {
      this.$router.push({ name: 'board' })
    },
    createColumn() {
      this.$store.commit('CREATE_COLUMN', {
        name: this.newColumnName,
      })
      this.newColumnName = ''
    },
  },
}
</script>

<style lang="stylus">
.task
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-gray-800 no-underline

.board
  @apply p-4 bg-teal-500 h-full overflow-auto

.task-bg
  @apply inset-0 absolute
  background rgba(0, 0, 0, 0.5)
</style>
