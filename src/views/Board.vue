<template lang="pug">
.board
  h1 bonjour
</template>

<script>
export default {}
// @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline
// @extend .flex .items-center .flex-wrap .shadow .mb-2 .py-2 .px-2 .rounded .bg-white .text-grey-darkest .no-underline
</script>

<style lang="stylus">
.task
  @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-800 no-underline

.column
  @apply bg-grey-300 p-2 mr-4 text-left shadow rounded
  min-width 350px

.board
  @apply p-4 bg-teal-500 h-full overflow-auto

.task-bg
  @apply inset-0 absolute
  background rgba(0, 0, 0, 0.5)
</style>
