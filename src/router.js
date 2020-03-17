import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/views/Board.vue'

Vue.use(Router)

const routes = [
  {
    name: 'Board',
    path: '/',
    component: Board,
  },
]

export default new Router({
  mode: 'history',
  routes,
})
