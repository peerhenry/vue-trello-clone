<template lang="pug">
.task-view
  .flex.flex-col.flex-grow.items-start.justify-between.px-4
    input.p-2.w-full.mr-2.flex-grow.text-xl.font-bold(
      type="text"
      :value="task.name"
      @change="updateTaskProperty($event, 'name')"
      @keyup.enter="updateTaskProperty($event, 'name')"
    )
    textarea.relative.bg-transparent.px-2.w-full.border.mt-2.h-64.border-none.loading-normal(
      :value="task.description"
      @change="updateTaskProperty($event, 'description')"
    )
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
  methods: {
    updateTaskProperty(e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key: key,
        value: e.target.value,
      })
    },
  },
}
</script>

<style scoped lang="stylus">
.task-view
  @apply relative flex flex-row bg-white inset-0 mx-4 m-32 mx-auto py-4 text-left rounded shadow
  max-width 700px
</style>
