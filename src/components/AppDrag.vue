<template lang="pug">
div(
  draggable
  @dragstart.self="onDrag"
  @dragover.prevent
  @dragenter.prevent
)
  slot
</template>

<script>
export default {
  props: {
    transferData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onDrag(e) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('payload', JSON.stringify(this.transferData))
    },
  },
}
</script>

<style scoped lang="stylus"></style>
