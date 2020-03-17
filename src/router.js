import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/views/Board.vue'
import Task from '@/views/Task.vue'

Vue.use(Router)

const routes = [
  {
    name: 'board',
    path: '/',
    component: Board,
    children: [
      {
        path: 'task/:id',
        name: 'task',
        component: Task,
      },
    ],
  },
]

export default new Router({
  mode: 'history',
  routes,
})
