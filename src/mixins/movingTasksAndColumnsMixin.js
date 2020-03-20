export default {
  props: {
    column: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
    board: {
      type: Object,
      required: true,
    },
  },
  methods: {
    moveTask(e, toTasks, toTaskIndex) {
      const taskIndex = e.dataTransfer.getData('task-index')
      const fromColIndex = e.dataTransfer.getData('from-column-index')
      const fromTasks = this.board.columns[fromColIndex].tasks
      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        taskIndex,
        toTaskIndex,
      })
    },
    dropTaskOrColumn(e, { toTasks, toTaskIndex, toColumnIndex }) {
      const dragType = e.dataTransfer.getData('drag-type')
      if (dragType === 'task')
        this.moveTask(
          e,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length
        )
      else this.moveColumn(e, toColumnIndex)
    },
  },
}
