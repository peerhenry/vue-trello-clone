<template lang="pug">
div(
  @drop="onDrop"
  @dragover.prevent
  @dragenter.prevent
)
  slot
</template>

<script>
export default {
  props: {},
  methods: {
    onDrop(e) {
      e.stopPropagation()
      const transferData = JSON.parse(e.dataTransfer.getData('payload'))
      this.$emit('dropped', transferData)
    },
  },
}
</script>

<style scoped lang="stylus"></style>
