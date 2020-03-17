<template lang="pug">
.task-view
  .flex.flex-col.flex-grow.items-start.justify-between.px-4 {{ task.name }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Task',
  computed: {
    ...mapGetters(['getTask']),
    task() {
      console.log('id', this.$route.params.id)
      console.log('task', this.getTask(this.$route.params.id))
      return this.getTask(this.$route.params.id)
    },
  },
}
</script>

<style scoped lang="stylus">
.task-view
  @apply relative flex flex-row bg-white inset-0 mx-4 m-32 mx-auto py-4 text-left rounded shadow
  max-width 700px
</style>
