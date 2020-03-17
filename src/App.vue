<template lang="pug">
#app
  router-view
</template>

<style lang="stylus">
@import 'assets/styles/tailwind.postcss'

html, body, #app
  margin 0
  padding 0
  height 100%

#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color white
  width 100%
  overflow auto

.container
  @apply mx-auto
</style>
