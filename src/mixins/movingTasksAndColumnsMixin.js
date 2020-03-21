import AppDrag from '@/components/AppDrag'
import AppDrop from '@/components/AppDrop'

export default {
  components: { AppDrag, AppDrop },
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
    moveColumn(transferData, toColumnIndex) {
      const fromColumnIndex = transferData.fromColumnIndex
      this.$store.commit('MOVE_COLUMN', {
        fromColumnIndex,
        toColumnIndex,
      })
    },
    moveTask(transferData, toTasks, toTaskIndex) {
      const taskIndex = transferData.taskIndex
      const fromColumnIndex = transferData.fromColumnIndex
      const fromTasks = this.board.columns[fromColumnIndex].tasks
      this.$store.commit('MOVE_TASK', {
        fromTasks,
        toTasks,
        taskIndex,
        toTaskIndex,
      })
    },
    dropTaskOrColumn(transferData, { toTasks, toTaskIndex, toColumnIndex }) {
      const dragType = transferData.dragType
      if (dragType === 'task')
        this.moveTask(
          transferData,
          toTasks,
          toTaskIndex !== undefined ? toTaskIndex : toTasks.length
        )
      else this.moveColumn(transferData, toColumnIndex)
    },
  },
}
